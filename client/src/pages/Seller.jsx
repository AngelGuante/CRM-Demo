import React, { useEffect, useState, useRef } from "react"
import { Get } from "../utils/Requests"
import { TableFixedHeader } from "../componets/tableFixedHeader"
import { SellerCRUD } from "../utils/Modal"
import { Post } from "../utils/Requests"
import { PromiseToast } from '../utils/Toast'
import { FAB } from '../componets/buttons/FABS/FAB'

//---------
//- TO DO -
//---------
//*CUANDO HAY UN ERROR EN EL POST DEL UPDATE, SE QUEDA PEGADA LA APLICACION
//*CUANDO SE EDITA UN VENDEDOR, NO SE PUEDEN GUARDAR LOS DATOS SIMILARES A OTRO EXISTENTE

const SellerContainer = () => {
    const [loading, setLoading] = useState(false)
    const [modalCRUDStatus, setModalCRUDStatus] = useState('see')
    let sellersData = useRef([])
    const sellerFilled = useRef(false)
    const [sellers, setSellers] = useState([])
    const [filterForm, setFilterForm] = useState({
        searchInput: '',
        selectOption: ''
    })
    const [sellerSelected, setSellerSelected] = useState({
        id: '',
        fullname: ''
    })

    useEffect(() => {
        const fillSeller = async () => {
            if (!sellerFilled.current) {
                sellerFilled.current = true
                GetData();
            }
        }
        fillSeller()
    })

    const GetData = async () => {
        setLoading(true);
        let offset = sellersData.current.length;
        let url = `seller/?offset=${offset}`;

        if (filterForm['selectOption'] === 'Código' && filterForm['searchInput'])
            url += `&code=${filterForm['searchInput']}`
        else if (filterForm['selectOption'] === 'Nombre' && filterForm['selectOption'])
            url += `&name=${filterForm['searchInput']}`

        let data = (await Get(url))['message'];
        if (data)
            sellersData.current = sellersData.current.concat(data);

        setSellers(sellersData.current);
        setLoading(false);
    }

    const FilterData = async () => {
        sellersData.current = []
        GetData()
    }

    const TableRowClickEvent = async (index) => {
        setLoading(true);
        const data = (await Get(`seller/?code=${index}`))['message']

        if (data) {
            setSellerSelected({
                id: data[0]['code'],
                fullname: data[0]['name']
            })
            setModalCRUDStatus('edit')
            toogleModal()
        }
        setLoading(false)
    }

    const EditSeller = async () =>
        CRUDBaseMethod({
            'method': 'Update',
            'loadingAction': 'Actualizando',
            'props': [
                {
                    'name': 'status',
                    'value': 2
                }
            ]
        })

    const AddSeller = async () =>
        CRUDBaseMethod({
            'method': 'Insert',
            'loadingAction': 'Creando'
        })

    const CRUDBaseMethod = async (params) => {
        setLoading(true)

        const json = {
            'code': sellerSelected['id'],
            'name': sellerSelected['fullname']
        }

        //If there're more props than code and name.
        if (params['props'])
            params['props'].forEach(ele => {
                console.log(ele)
                json[ele['name']] = ele['value']
            })

        const response = await PromiseToast(await Post(`seller/${params['method']}`,
            json,
            { 'token': true }), {
            'loadingMessage': `${params['loadingAction']} registro`,
            'success': `Listo`,
            'error': 'Algo salio mal'
        })

        if (response['status'] === 200 || response['status'] === 201)
            FilterData()

        toogleModal()
        setLoading(false)
    }

    const toogleModal = () => {
        document.getElementById('btnTgl').click()
    }

    const ActionFAB = () => {
        sellerSelected.id = ''
        sellerSelected.fullname = ''
        setModalCRUDStatus('new')
        toogleModal()
    }

    const handleFilterForm = (event) => {
        setFilterForm({
            ...filterForm,
            [event.target.name]: event.target.value
        });
    }

    const handleInputChange = (event) => {
        setSellerSelected({
            ...sellerSelected,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <FAB action={() => {
                ActionFAB()
            }} />
            <SellerCRUD
                id={sellerSelected.id}
                fullname={sellerSelected.fullname}
                imputsChanged={handleInputChange}
                sellerCRUDImputs={
                    {
                        'id': 'id',
                        'name': 'fullname'
                    }
                }
                mode={modalCRUDStatus}
                edit={EditSeller}
                add={AddSeller}
                loading={loading}
            />
            <TableFixedHeader
                tableHeader={'Distribuidores'}
                loading={loading}
                columsHeaders={[
                    { 'name': 'Código' },
                    { 'name': 'Nombre' }]}
                columsName={[
                    { 'name': 'code' },
                    { 'name': 'name' }]}
                items={sellers}
                indexCol={true}
                getData={GetData}
                filterData={FilterData}
                filterOptions={[
                    { 'name': 'Código' },
                    { 'name': 'Nombre' }]}
                filterOnChange={handleFilterForm}
                TableRowClickEvent={TableRowClickEvent}
            />
        </>
    )
}

export { SellerContainer }