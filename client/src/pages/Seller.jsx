import { useEffect, useState, useRef } from "react";
import { Get } from "../utils/Requests";
import { TableFixedHeader } from "../componets/tableFixedHeader";

const SellerContainer = () => {
    const [sellers, setSellers] = useState([]);
    const sellerFilled = useRef(false);
    const [filterForm, setFilterForm] = useState({
        searchInput: '',
        selectOption: ''
    });

    useEffect(() => {
        const fillSeller = async () => {
            if (!sellerFilled.current) {
                sellerFilled.current = true;
                GetData();
            }
        }
        fillSeller();
    });

    const handleFilterForm = (event) => {
        setFilterForm({
            ...filterForm,
            [event.target.name]: event.target.value
        });
    }

    const GetData = async () => {
        let offset = sellers.length;
        let url = `seller/?offset=${offset}`;


        if (filterForm['selectOption'] === 'Código' && filterForm['searchInput'])
            url += `&code=${filterForm['searchInput']}`
        else if (filterForm['selectOption'] === 'Nombre' && filterForm['selectOption'])
            url += `&name=${filterForm['searchInput']}`

            console.log(filterForm['selectOption'])
            console.log(url)

        let data = (await Get(url))['message'];
        if (data)
            setSellers(sellers.concat((data)));
    }

    const FilterData = async () => {
        console.log(filterForm)
        setSellers([])
        GetData();
    }

    return (
        <div>
            <TableFixedHeader
                tableHeader={'Distribuidores'}
                columsHeaders={[
                    { 'name': 'Código' },
                    { 'name': 'Nombre' }]}
                columsName={[
                    { 'name': 'code' },
                    { 'name': 'name' }]}
                items={sellers}
                getData={GetData}
                filterData={FilterData}
                filterOptions={[
                    { 'name': 'Código' },
                    { 'name': 'Nombre' }]}
                filterOnChange={handleFilterForm}
            />
        </div>
    );
}

export { SellerContainer }