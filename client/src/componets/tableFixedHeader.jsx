{/*
<TableFixedHeader
    tableHeader={''}            // Header of table
    columsHeaders={[]}          // Table columns headerd
    columsName={[]}             // Data json names
    items={}                    // DATA
    getData={}                  // Method to get more data button
    filterData={}               // Method to get data filtered
    filterOptions={[]}          // FIlter menu ootions of select
    filterOnChange={}           // Method to change properties of filters
/> 
*/}

const TableFixedHeader = (proops) => {
    // height of table
    let height = proops['items'].length * 50;
    height = (height > 800 ? 800 : height) + ('getData' in proops ? 80 : 40);

    return (
        <div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{proops['tableHeader'].toUpperCase()}</h3>
                                    {'filterData' in proops &&
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{ width: (proops['filterOptions'] ? 300 : 200) }}>
                                                <div className="input-group-append">
                                                    <div className="input-group-append">
                                                        <input type="text" name="searchInput" className="form-control float-right" placeholder="Search"
                                                            onChange={proops.filterOnChange} />

                                                        {proops['filterOptions'] &&
                                                            <select className="form-control" name="selectOption"
                                                                onChange={proops.filterOnChange}>
                                                                {proops['filterOptions'].map((item, index) =>
                                                                    <option key={index} value={item['name']}>{item['name']}</option>
                                                                )}
                                                            </select>}
                                                    </div>

                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default" onClick={proops.filterData}>
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                                <div className="card-body table-responsive p-0" style={{ height: height }}>
                                    <table className="table table-head-fixed text-nowrap">
                                        <thead>
                                            <tr>
                                                {proops['columsHeaders'] && proops['columsHeaders'].map((column, index) =>
                                                    <td key={index}>
                                                        {column['name']}</td>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proops['items'].map((item, index) =>
                                                <tr data-widget="expandable-table" aria-expanded="false"
                                                    key={index}>
                                                    {proops['columsName'] && proops['columsName'].map((column, index) =>
                                                        <td key={index}>{item[column['name']]}</td>)}
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {'getData' in proops && <div className="col-md-12">
                                        <button type="button" className="btn btn-default btn-block btn-sm" onClick={proops.getData}><i className="fas fa-angle-down"></i></button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export { TableFixedHeader }
