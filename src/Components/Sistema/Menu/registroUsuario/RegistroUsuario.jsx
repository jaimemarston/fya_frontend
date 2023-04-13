/* import React, { useState } from "react";
import * as XLSX from "xlsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { LeftToolBarTemplate, RightToolBarTemplate } from "../../../Molecula";
import { Button } from "primereact/button";
 import ModalRegistroUsuario from './modal/ModalRegistroUsuario';


const usuario = [
  {
    id: 1,
    nombre: "pepe",
    correo: "corre@gmail.com",
    estado: "activo"
  },
  {
    id: 2,
    nombre: "pepe",
    correo: "corre@gmail.com",
    estado: "activo"
  },
  {
    id: 3,
    nombre: "pepe",
    correo: "corre@gmail.com",
    estado: "activo"
  }
];

const RegistroUsuario = () => {
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
  const [edit, setEdit] = useState(null);
  const openModal = () => {
    setView(!view);
  };

  const tableButtonEdit = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => editData(rowData)}
        />
      </div>
    );
  };

  const editData = (data) => {
    setView(!view);
    setEdit(data);
  };

  const tableButtonDelete = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          // onClick={() => deleteData(rowData.id)}
        />
      </div>
    );
  }; */

  // const RightToolBarTemplate = () => {
  //   return (
  //     <React.Fragment>
  //       <FileUpload
  //         customUpload
  //         uploadHandler={readExcel}
  //         accept='.xlsx'
  //         mode='basic'
  //         maxFileSize={1000000}
  //         label='Import'
  //         chooseLabel='Importar Proyectos'
  //         className='mr-2 inline-block'
  //       />
  //     </React.Fragment>
  //   );
  // };

  // const readExcel = ({ files }) => {
  //   const [File] = files;
  //   const reader = new FileReader();
  //   const rABS = !!reader.readAsBinaryString;

  //   reader.onload = (e) => {
  //     const bstr = e.target.result;
  //     const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

/*   //     const listData = (data) => {
  //       const newData = [];
  //       for (let i = 1; i < data.length - 1; i++) {
  //         const element = data[i];
  //         const items = {
  //           id: i,
  //           codigo: element[0],
  //           nombreAbreviado: element[1],
  //           nombreCompleto: element[2],
  //         };
  //         newData.push(items);
  //       }
  //       return newData;
  //     };
  //     setAddData(listData(data));
  //   };

  //   if (rABS) reader.readAsBinaryString(File);
  //   else reader.readAsArrayBuffer(File); */
  // };

/*   return (
    <div className="grid crud-demo">
    
      <div className="col-12">
        <div className="card">
          <Toolbar
            className="mb-4"
            right={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: "Agregar Usuario"
            })}
          ></Toolbar>
          <DataTable value={usuario} responsiveLayout="scroll">
            <Column field="id" header="Id">
              {usuario.map((item, index) => {
                {
                  index + 1;
                }
              })}
            </Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="correo" header="Correo"></Column>
            <Column field="estado" header="estado"></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      {view && (
        <ModalRegistroUsuario
          setView={setView}
          view={view}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export { RegistroUsuario };
 */

import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


import { InputSwitch } from 'primereact/inputswitch';
import { fetchDelete, fetchGet, fetchPut, postUser } from '../../../../api';

const RegistroUsuario = () => {
  let empty = {
    codigo: '',
    nombre: '',
    email: '',
    password: '',
    rol:"USER_ROLE",
    estado: true,
  };
  const [listProduct, setlistProduct] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [newData, setNewData] = useState(null);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [value, setValue] = useState(empty.estado);

  const [product, setProduct] = useState(empty);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const switchFondo = (e) => {
    setValue(e);
  };

  const listarUsuarios = () => {
/*     const empleadoService = new EmpleadoService(); */
/*     empleadoService.getUsers().then((data) => setlistProduct(data)); */
      fetchGet('usuario').then((data) => {
        setlistProduct(data.usuario)
      })
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const openModal = () => {
    setIsModal(!isModal);

    if (product.length === 0) {
      setProduct({});
    }
  };

  const closeModal = () => {
    setIsCloseModal(!isCloseModal);
  };

  const saveProduct = () => {
    setSubmitted(true);
    console.log(product)
    if (
      product?.nombre.trim() &&
      product?.codigo.trim() &&
      product?.email.trim() &&
      product?.password.trim()
    ) {
      if (product.id) {
        product.estado = value;
      
      
        fetchPut(`usuario/${product.id}`,'PATCH', product)
          .then((res) => {
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Usuario actualizado',
              life: 3000,
            });
            listarUsuarios();
            openModal();
            setProduct(empty);
          })
          .catch((error) => {
            toast.current.show({
              severity: 'error',
              summary: 'Successful',
              detail: error.response.data.message,
              life: 3000,
            });
          }); 
      } else {
 
        if (
          product?.nombre.trim() &&
          product?.codigo.trim() &&
          product?.email.trim() &&
          product?.password.trim()
        ) {
          product.estado = value;

          postUser(product).then((data) => {
            toast.current.show({
              severity: 'error',
              summary: 'Successful',
              detail: error.response.data.message,
              life: 3000,
            });
          })


/*           axios
            .post(`${mainUrl}/usuarios`, product)
            .then((res) => {
              toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Usuario creado',
                life: 3000,
              });
              listarUsuarios();
              openModal();
              setProduct({});
            })
            .catch((error) => {
              toast.current.show({
                severity: 'error',
                summary: 'Successful',
                detail: error.response.data.message,
                life: 3000,
              });
              listarUsuarios();
            }); */
        }
      }
    }
  };

  const editProduct = (product) => {
 
    setProduct({ ...product });
    // console.log('product', product);
    setIsModal();
  };

  const confirmDeleteProduct = (rowData) => {
    setNewData(rowData);
    closeModal();
  };

  const deleteSelected = () => {
/*     axios
      .delete(`${mainUrl}/usuarios/${newData.id}`)
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Usuario eliminado',
          life: 3000,
        });
        listarUsuarios();
        closeModal();
      })
      .catch((error) => {
        toast.current.show({
          severity: 'error',
          summary: 'Successful',
          detail: error.response.data.message,
          life: 3000,
        });
        closeModal();
      }); */
      fetchDelete(`usuario/${newData.id}`)
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Usuario eliminado',
          life: 3000,
        });
        listarUsuarios();
        closeModal();
      })
      .catch((error) => {
        toast.current.show({
          severity: 'error',
          summary: 'Successful',
          detail: error.response.data.message,
          life: 3000,
        });
        closeModal();
      }); 
  };

  const onInputChange = (e, name) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const leftToolbarTemplate = () => (
    <>
      <div className='my-2'>
        <Button
          label='Nuevo'
          icon='pi pi-plus'
          className='p-button-success mr-2'
          onClick={openModal}
        />
      </div>
    </>
  );

  const codigoBodyTemplate = (rowData) => {
    return (
      <>
        <span className='p-column-title'>Codigo</span>
        {rowData.codigo}
      </>
    );
  };

  const nombreBodyTemplate = (rowData) => {
    return (
      <>
        <span className='p-column-title'>Nombre</span>
        {rowData.nombre}
      </>
    );
  };

  const usuarioBodyTemplate = (rowData) => {
    return (
      <>
        <span className='p-column-title'>Usuario</span>
        {rowData.email}
      </>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className='p-column-title'>Estado</span>
        {rowData?.estado === true ? 'Activo' : 'Inactivo'}
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => {
            editProduct(rowData);
            openModal();
          }}
        />
      </div>
    );
  };

  const actionBodyTemplate2 = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning '
          onClick={() => {
            confirmDeleteProduct(rowData);
          }}
        />
      </div>
    );
  };

  const header = (
    <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
      <h5 className='m-0'>Lista de Usuarios</h5>
      <span className='block mt-2 md:mt-0 p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Buscar...'
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <>
      <Button
        label='Cancelar'
        icon='pi pi-times'
        className='p-button-text'
        onClick={() => {
          openModal();
          setProduct({});
        }}
      />
      <Button
        label='Guardar'
        icon='pi pi-check'
        className='p-button-text'
        onClick={saveProduct}
      />
    </>
  );

  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          <Toast ref={toast} />
          <Toolbar className='mb-4' left={leftToolbarTemplate}></Toolbar>
          <TablaUsuario
            dt={dt}
            listProduct={listProduct}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={header}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            codigoBodyTemplate={codigoBodyTemplate}
            nombreBodyTemplate={nombreBodyTemplate}
            usuarioBodyTemplate={usuarioBodyTemplate}
            statusBodyTemplate={statusBodyTemplate}
          />
          {isCloseModal &&
            EliminarUsuario({
              isCloseModal,
              closeModal,
              deleteSelected,
            })}

          {isModal &&
            CrudUsuario({
              isModal,
              productDialogFooter,
              openModal,
              product,
              setProduct,
              onInputChange,
              submitted,
              switchFondo,
              value,
              setValue,
            })}
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export { RegistroUsuario };

const TablaUsuario = ({
  dt,
  listProduct,
  selectedProducts,
  setSelectedProducts,
  globalFilter,
  header,
  actionBodyTemplate,
  actionBodyTemplate2,
  codigoBodyTemplate,
  nombreBodyTemplate,
  usuarioBodyTemplate,
  statusBodyTemplate,
}) => {
  return (
    <DataTable
      ref={dt}
      value={listProduct}
      selection={selectedProducts}
      onSelectionChange={(e) => setSelectedProducts(e.value)}
      dataKey='id'
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      className='datatable-responsive'
      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
      currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords}'
      globalFilter={globalFilter}
      emptyMessage='No products found.'
      header={header}
      responsiveLayout='scroll'
    >
      <Column selectionMode='multiple' headerStyle={{ width: '3rem' }}></Column>
      <Column
        field='codigo'
        header='Codigo'
        sortable
        body={codigoBodyTemplate}
        headerStyle={{ width: '14%', minWidth: '10rem' }}
      ></Column>
      <Column
        field='nombre'
        header='Nombre'
        sortable
        body={nombreBodyTemplate}
        headerStyle={{ width: '44%', minWidth: '10rem' }}
      ></Column>
      <Column
        field='email'
        header='Usuario'
        sortable
        body={usuarioBodyTemplate}
        headerStyle={{ width: '14%', minWidth: '10rem' }}
      ></Column>
      <Column
        field='rol'
        header='Rol'
        sortable
        headerStyle={{ width: '14%', minWidth: '10rem' }}
      ></Column>
      <Column
        field='inventoryStatus'
        header='Status'
        body={statusBodyTemplate}
        sortable
        headerStyle={{ width: '14%', minWidth: '10rem' }}
      ></Column>
      <Column body={actionBodyTemplate}></Column>
      <Column body={actionBodyTemplate2}></Column>
    </DataTable>
  );
};

const EliminarUsuario = ({ isCloseModal, closeModal, deleteSelected }) => {
  const deleteDialogFooter = (
    <>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={closeModal}
      />
      <Button
        label='Si'
        icon='pi pi-check'
        className='p-button-text'
        onClick={() => deleteSelected()}
      />
    </>
  );

  return (
    <Dialog
      visible={isCloseModal}
      style={{ width: '450px' }}
      header='Confirmar'
      modal
      footer={deleteDialogFooter}
      onHide={closeModal}
    >
      <div className='flex align-items-center justify-content-center'>
        <i
          className='pi pi-exclamation-triangle mr-3'
          style={{ fontSize: '2rem' }}
        />
        <span>Desea eliminar al usuario?</span>
      </div>
    </Dialog>
  );
};

const CrudUsuario = ({
  isModal,
  productDialogFooter,
  openModal,
  product,
  onInputChange,
  submitted,
  switchFondo,
  value,
  setValue,
}) => {
  // console.log(product);

  return (
    <Dialog
      visible={isModal}
      style={{ width: '450px' }}
      header='Detalle del registro'
      modal
      className='p-fluid'
      footer={productDialogFooter}
      onHide={openModal}
    >
      <div className='field'>
        <label htmlFor='codigo'>codigo</label>
        <InputText
          id='codigo'
          name='codigo'
          value={product?.codigo?.trim()}
          onChange={(e) => onInputChange(e, 'codigo')}
          required
          autoFocus
          className={classNames({
            'p-invalid': submitted && !product.codigo,
          })}
        />
        {submitted && !product.codigo && (
          <small className='p-invalid'>Codigo es Requerido.</small>
        )}
      </div>

      <div className='field'>
        <label htmlFor='nombre'>Nombre</label>
        <InputText
          id='nombre'
          name='nombre'
          value={product?.nombre?.trim()}
          onChange={(e) => onInputChange(e, 'nombre')}
          required
          autoFocus
          className={classNames({
            'p-invalid': submitted && !product.nombre,
          })}
        />
        {submitted && !product.nombre && (
          <small className='p-invalid'>Nombre es Requerido.</small>
        )}
      </div>

      <div className='field'>
        <label htmlFor='email'>Email</label>
        <InputText
          id='email'
          name='email'
          type='email'
          value={product?.email?.trim()}
          onChange={(e) => onInputChange(e, 'email')}
          required
          autoFocus
          className={classNames({
            'p-invalid': submitted && !product.email,
          })}
        />
        {submitted && !product.email && (
          <small className='p-invalid'>Usuario es Requerido.</small>
        )}
      </div>
      <div className='field'>
        <label htmlFor='password'>Contraseña</label>
        <InputText
          type='password'
          name='password'
          id='password'
          value={product?.password?.trim()}
          onChange={(e) => onInputChange(e, 'password')}
          required
          autoFocus
          className={classNames({
            'p-invalid': submitted && !product.password,
          })}
        />
        {submitted && !product.password && (
          <small className='p-invalid'>Password es Requerido.</small>
        )}
      </div>

      <div
        className='field'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <label htmlFor='estado'>Estado</label>
        <InputSwitch
          defaultValue={value}
          checked={product.estado}
          onChange={(e) => setValue(e.value)}
        />
      </div>
    </Dialog>
  );
};
