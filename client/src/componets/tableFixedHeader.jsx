/*
<TableFixedHeader
    tableHeader={''}            // Header of table
    loading=bool                // Table loading div
    columsHeaders={[]}          // Table columns headerd
    columsName={[]}             // Data json names
    items={[]}                  // DATA
    indexCol=bool               // Show index of rows
    getData={}                  // Method to get more data button
    filterData={}               // Method to get data filtered
    filterOptions={[]}          // FIlter menu options of select
    filterOnChange={}           // Method to change properties of filters
    TableRowClickEvent={}       // Method when table row clicked
/> 
*/

import { Loading } from '../componets/loading'

const TableFixedHeader = (props) => {
    // height of table
    let height = props['items'].length * 50;
    height = (height > 800 ? 800 : height) + ('getData' in props ? 80 : 40);

    // event click of table 
    const tableRowClicked = (e) =>
        props.TableRowClickEvent(e['target']['parentElement'].children[props['indexCol'] ? 1 : 0].innerHTML)

    return (
        <div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                {props['loading'] && <Loading />}

                                <div className="card-header">
                                    <h3 className="card-title">{props['tableHeader'].toUpperCase()}</h3>
                                    {'filterData' in props &&
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{ width: (props['filterOptions'] ? 300 : 200) }}>
                                                <div className="input-group-append">
                                                    <div className="input-group-append">
                                                        <input type="text" name="searchInput" className="form-control float-right" placeholder="Search"
                                                            onChange={props.filterOnChange} />

                                                        {props['filterOptions'] &&
                                                            <select className="form-control" name="selectOption"
                                                                onChange={props.filterOnChange}>
                                                                {props['filterOptions'].map((item, index) =>
                                                                    <option key={index} value={item['name']}>{item['name']}</option>
                                                                )}
                                                            </select>}
                                                    </div>

                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default" onClick={props.filterData}>
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                                <div className="card-body table-responsive p-0" style={{ height: height }}>
                                    <table className="table table-head-fixed text-nowrap table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                {props['indexCol'] && <td>#</td>}
                                                {props['columsHeaders'] && props['columsHeaders'].map((column, index) =>
                                                    <td key={index}>{column['name'].toUpperCase()}</td>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props['items'].map((item, index) =>
                                                <tr id={props['tableHeader'].replaceAll(' ', '_').toLocaleLowerCase() + '_row_' + index}
                                                    key={index}
                                                    onClick={tableRowClicked}
                                                    data-widget="expandable-table" aria-expanded="false">
                                                    {props['indexCol'] && <td key={'i' + index}>{index + 1}</td>}
                                                    {props['columsName'] && props['columsName'].map((column, index) =>
                                                        <td key={index}>{item[column['name']].toUpperCase()}</td>)}
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {('getData' in props && props['items'].length != 1) && <div className="col-md-12">
                                        <button type="button" className="btn btn-default btn-block btn-sm" onClick={props.getData}><i className="fas fa-angle-down"></i></button>
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
