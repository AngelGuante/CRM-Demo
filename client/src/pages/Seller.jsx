import React, { useEffect, useState, useRef } from "react"
import { Get } from "../utils/Requests"
import { TableFixedHeader } from "../componets/tableFixedHeader"
import { SellerCRUD } from "../utils/Modal"
import { Post } from "../utils/Requests"
import { PromiseToast, ErrorToast } from '../utils/Toast'

//---------
//- TO DO -
//---------
//*CUANDO HAY UN ERROR EN EL POST DEL UPDATE, SE QUEDA PEGADA LA APLICACION
//*CUANDO SE EDITA UN VENDEDOR, NO SE PUEDEN GUARDAR LOS DATOS SIMILARES A OTRO EXISTENTE

const SellerContainer = () => {
    const [loading, setLoading] = useState(false)
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
                sellerFilled.current = true;
                GetData();
            }
        }
        fillSeller();
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
            document.getElementById('btnTgl').click()
        }
        setLoading(false)
    }

    const EditSeller = async () => {
        setLoading(true)

        const response = await PromiseToast(await Post('seller/Update',
        {
            'code': sellerSelected['id'],
            'name': sellerSelected['fullname'],
            'status': 2
        },
        { 'token': true }), {
            'loadingMessage': 'Actualizando registro',
            'success': `Listo`,
            'error': 'Algo salio mal'
        })

        if (response['status'] === 200)
            FilterData()

        setLoading(false)
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
            <SellerCRUD
                id={sellerSelected.id}
                fullname={sellerSelected.fullname}
                imputsChanged={handleInputChange}
                sellerCRUDImputs={
                    { 'name': 'fullname' }
                }
                edit={EditSeller}
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