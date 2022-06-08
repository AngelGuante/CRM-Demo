const TableFixedHeader = (data) => {
    console.log(data)

    // height of table
    let height = data['items'].length * 50;
    height = (height > 800 ? 800 : height) + (data['showMoreDataButton'] ? 35 : 0);

    return (
        <div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{data['tableHeader'].toUpperCase()}</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 150 }}>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0" style={{ height: height }}>
                                    <table className="table table-head-fixed text-nowrap">
                                        <thead>
                                            <tr>
                                                {data.colums && data['columsHeaders'].map(column =>
                                                    <td key={column['name']}>
                                                        {column['name']}</td>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.items && data['items'].map(item =>
                                                <tr data-widget="expandable-table" aria-expanded="false"
                                                    key={item['code']}>
                                                    {data['columsName'] && data['columsName'].map(column =>
                                                        <td key={`${item['code']}_${column['name']}`}>{item[column['name']]}</td>)}
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {data['showMoreDataButton'] && <div className="col-md-12">
                                        <button type="button" className="btn btn-default btn-block btn-sm" onClick={data.getData}><i className="fas fa-angle-down"></i></button>
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
