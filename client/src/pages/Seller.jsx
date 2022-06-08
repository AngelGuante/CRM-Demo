import { useEffect, useState } from "react";
import { Get } from "../utils/Requests";
import { TableFixedHeader } from "../componets/tableFixedHeader";

const SellerContainer = () => {
    const [sellers, setSellers] = useState([]);
    const [sellersSetted, setSellersSetted] = useState(false);

    useEffect(() => {
        if (!sellersSetted) {
            setSellersSetted(true);
            const fillSeller = async () => {
                GetData();
            }
            fillSeller();
        }
    });

    const GetData = async (params) => {
        setSellers((await Get('seller/?code=&offset=0&name='))['message']);
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
                showMoreDataButton={true}
                getData={GetData}
            />
        </div>
    );
}

export { SellerContainer }