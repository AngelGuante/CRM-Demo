
import React, { useEffect, useState, useRef } from 'react'
import { DefaultInput } from '../componets/inputs/defaultInput'
import { OptionsButtons } from '../componets/buttons/optionsButtons'
import { Loading } from '../componets/loading'

const SellerCRUD = (props) => {
    let [mode, setMode] = useState('')

    const reset = () => setMode('see')

    //Edit selected user and set de new values
    const edit = () => {
        props['edit']()
    }

    const statusGetted = useRef(false)
    useEffect(() => {
        if (!statusGetted.current || props['mode'] === 'new') {
            setMode(props['mode'])
            statusGetted.current = true
        }
    }, [props])

    return (
        <div>
            <button id='btnTgl' data-toggle="modal" data-target="#modal" onClick={reset} hidden>
            </button>

            <div className="modal fade" id="modal" tabIndex={-1} role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        {props['loading'] && <Loading />}

                        <div className="card card-secondary">
                            <div className="card-header">
                                <h3 className="card-title">Distribuidor</h3>
                            </div>
                            <div className="card-body">
                                <strong><i className="fas fa-book mr-1" /> Identificador</strong>
                                {
                                    mode === 'new'
                                        ?
                                        <DefaultInput
                                            value={props['id']}
                                            name={props['sellerCRUDImputs']['id']}
                                            onChange={props['imputsChanged']}
                                        />
                                        :
                                        <p className="text-muted">
                                            {props['id']}
                                        </p>
                                }
                                <hr />
                                <strong><i className="fas fa-map-marker-alt mr-1" /> Nombre</strong>
                                {
                                    mode === 'edit' || mode === 'new'
                                        ?
                                        <DefaultInput
                                            value={props['fullname']}
                                            name={props['sellerCRUDImputs']['name']}
                                            onChange={props['imputsChanged']}
                                        />
                                        :
                                        <p className="text-muted">
                                            {props['fullname']}
                                        </p>
                                }
                                <hr />

                                <div className='row'>
                                    {
                                        mode === 'see'
                                            ?
                                            <OptionsButtons
                                                onclick={() => {
                                                    setMode('edit')
                                                }}
                                                icon='fas fa-edit'
                                                text='Editar'
                                            />
                                            :
                                            mode === 'new'
                                                ?
                                                <OptionsButtons
                                                    onclick={() => {
                                                        props['add']()
                                                    }}
                                                    icon='fas fa-plus'
                                                    text='Agregar'
                                                />
                                                :
                                                ''
                                    }
                                </div>
                            </div>

                            <div className='row'>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                                {
                                    mode === 'edit'
                                        ?
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-info" onClick={edit}>Editar</button>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SellerCRUD }