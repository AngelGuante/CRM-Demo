import { useEffect, useState, useRef } from "react";
import { Get } from "../utils/Requests";
import { TableFixedHeader } from "../componets/tableFixedHeader";

const SellerContainer = () => {
    let sellersData = useRef([]);
    const sellerFilled = useRef(false);
    const [sellers, setSellers] = useState([]);
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
    };

    const [loading, setLoading] = useState(false);

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
        sellersData.current = [];
        GetData();
    }

    return (
        <div>
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
            />
        </div>
    );
}

export { SellerContainer }