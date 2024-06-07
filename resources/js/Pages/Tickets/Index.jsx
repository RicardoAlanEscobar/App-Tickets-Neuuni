import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/Select';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import WarningButton from '@/Components/WarningButton';
import CustomDatePicker from '@/Components/DatePicker';
import DangerButton from '@/Components/DangerButton';
import { parseISO } from 'date-fns'; // Import parseISO

export default function TicketsIndex({ auth, tickets }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const nombreInput = useRef();
    const problemaInput = useRef();
    const estadoInput = useRef();
    const prioridadInput = useRef();
    const creacionInput = useRef();
    const terminoInput = useRef();
    const tipoProblemaInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
        Nombre: '', Problema: '', Estado: '', Prioridad: '', Creacion: '', Termino: '', TipoProblema: ''
    });

    const openModal = (op, id = '', Nombre = '', Problema = '', Estado = '', Prioridad = '', Creacion = '', Termino = '', TipoProblema = '') => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle('Añadir Ticket');
            setData({ Nombre: '', Problema: '', Estado: '', Prioridad: '', Creacion: '', Termino: '', TipoProblema: '' });
        } else {
            setTitle('Editar Ticket');
            setData({ id, Nombre, Problema, Estado, Prioridad, Creacion, Termino, TipoProblema });
        }
    }

    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('tickets.store'), {
                onSuccess: () => { ok('¡Ticket Añadido!') },
                onError: handleErrors
            });
        } else {
            put(route('tickets.update', data.id), {
                onSuccess: () => { ok('¡Ticket Modificado!') },
                onError: handleErrors
            });
        }
    }

    const handleErrors = () => {
        console.log(errors);
        if (errors.Nombre) {
            reset('Nombre');
            nombreInput.current.focus();
        }
        if (errors.Problema) {
            reset('Problema');
            problemaInput.current.focus();
        }
        if (errors.Estado) {
            reset('Estado');
            estadoInput.current.focus();
        }
        if (errors.Prioridad) {
            reset('Prioridad');
            prioridadInput.current.focus();
        }
        if (errors.Creacion) {
            reset('Creacion');
            creacionInput.current.focus();
        }
        if (errors.Termino) {
            reset('Termino');
            terminoInput.current.focus();
        }
        if (errors.TipoProblema) {
            reset('TipoProblema');
            tipoProblemaInput.current.focus();
        }
    }

    const ok = (mensaje) => {
        reset();
        closeModal();
        Swal.fire({ title: mensaje, icon: 'success' });
    }

    const eliminar = (id, nombre) => {
        const alerta = Swal.mixin({ buttonsStyling: true });
        alerta.fire({
            title: '¿Seguro que quiere eliminar este ticket?',
            text: 'Se perderán los datos definitivamente',
            icon: 'question', showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, Eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('tickets.destroy', id), { onSuccess: () => { ok('¡Ticket Eliminado!') } });
            }
        });
    }

    const itemsPerPage = 10;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const filteredTickets = searchTerm ? tickets.filter(ticket =>
        ticket.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) : tickets;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTickets.length);
    const currentTickets = filteredTickets.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight"><i className="fa-solid fa-ticket mr-2"></i>Tickets</h2>}
        >
            <Head title="Tickets"  />
            <div className="grid min-h-screen place-items-center bg-gray-100 p-4">
                <div className="flex justify-between w-full mb-2">
                    <div className="relative w-10/12">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block w-full px-4 py-2 pl-10 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                    <PrimaryButton onClick={() => openModal(1)} className="ml-4">
                        <i className="fa-solid fa-user-plus mr-2"></i>
                        Añadir Ticket
                    </PrimaryButton>
                </div>
                <div className="w-full overflow-hidden bg-white rounded-lg shadow-md ">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-2 text-center">Id</th>
                                <th className="px-4 py-2 text-center">Nombre</th>
                                <th className="px-4 py-2 text-center">Problema</th>
                                <th className="px-4 py-2 text-center">Estado</th>
                                <th className="px-4 py-2 text-center">Prioridad</th>
                                <th className="px-4 py-2 text-center">Creación</th>
                                <th className="px-4 py-2 text-center">Término</th>
                                <th className="px-4 py-2 text-center">Tipo de Problema</th>
                                <th className="px-4 py-2 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTickets.map((ticket, i) => (
                                <tr key={ticket.id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-4 py-2 text-center">{startIndex + i + 1}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Nombre}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Problema}</td>
                                    <td className="px-4 py-2 text-center">
                                    <div className={`inline-block px-2 py-1 rounded-lg ${
                                      ticket.Estado === 'Abierto' ? 'bg-blue-500 text-white' :
                                      ticket.Estado === 'Cerrado' ? 'bg-green-500 text-white' :
                                      ticket.Estado === 'En Seguimiento' ? 'bg-gray-300 text-black' : ''
                                  }`}>
                                      {ticket.Estado}
                                  </div>
                                  </td>
                                    <td className={`px-4 py-2 text-center ${ticket.Prioridad === 'Urgente' ? 'text-orange-500' : 'text-black'}`}>{ticket.Prioridad}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Creacion}</td>
                                    <td className="px-4 py-2 text-center">{ticket.Termino}</td>
                                    <td className="px-4 py-2 text-center">{ticket.TipoProblema}</td>
                                    <td className="px-4 py-2 text-center">
                                        <WarningButton onClick={() => openModal(2, ticket.id, ticket.Nombre, ticket.Problema, ticket.Estado, ticket.Prioridad, ticket.Creacion, ticket.Termino, ticket.TipoProblema)} className="mr-2">
                                            <i className="fas fa-edit"></i>
                                        </WarningButton>
                                        <DangerButton onClick={() => eliminar(ticket.id, ticket.Nombre)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-2 mb-2">
                        <ReactPaginate
                           previousLabel={<button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"><i className="fas fa-chevron-left"></i></button>}
                            nextLabel={<button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"><i className="fas fa-chevron-right"></i></button>}
                            breakLabel={<span className="px-3 py-2">...</span>}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(filteredTickets.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={10}
                            onPageChange={handlePageClick}
                            containerClassName="flex items-center space-x-2"
                            pageClassName="flex items-center"
                            pageLinkClassName="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                            activeClassName="bg-blue-600 text-white"
                        />
                    </div>
                </div>
            </div>
            <Modal show={modal} onClose={closeModal}>
                <h2 className="px-6 pt-6 text-lg font-medium text-gray-900 font">
                    {title}
                </h2>
                <form onSubmit={save} className="p-5">
                    <div className='mt-2'>
                        <InputLabel htmlFor="Nombre" value="Nombre"></InputLabel>
                        <TextInput
                            id="Nombre"
                            name="Nombre"
                            ref={nombreInput}
                            value={data.Nombre}
                            className="mt-1 block w-full"
                            autoComplete="Nombre"
                            isFocused={true}
                            onChange={(e) => setData('Nombre', e.target.value)}
                            required
                        />
                        <InputError message={errors.Nombre} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="Problema" value="Problema"></InputLabel>
                        <TextInput
                            id="Problema"
                            name="Problema"
                            ref={problemaInput}
                            value={data.Problema}
                            className="mt-1 block w-full"
                            autoComplete="Problema"
                            onChange={(e) => setData('Problema', e.target.value)}
                            required
                        />
                        <InputError message={errors.Problema} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="Estado" value="Estado"></InputLabel>
                        <SelectInput
                            id="Estado"
                            name="Estado"
                            ref={estadoInput}
                            value={data.Estado}
                            className="mt-1 block w-full"
                            autoComplete="Estado"
                            handleChange={(e) => setData('Estado', e.target.value)}
                            options={['Abierto', 'En Seguimiento', 'Cerrado']}
                            required
                        />
                        <InputError message={errors.Estado} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="Prioridad" value="Prioridad"></InputLabel>
                        <SelectInput
                            id="Prioridad"
                            name="Prioridad"
                            ref={prioridadInput}
                            value={data.Prioridad}
                            className="mt-1 block w-full"
                            autoComplete="Prioridad"
                            handleChange={(e) => setData('Prioridad', e.target.value)}
                            options={['Normal', 'Urgente']}
                            required
                        />
                        <InputError message={errors.Prioridad} className="mt-2" />
                    </div>
                    <div className='flex mt-2 px-4'>
                        <InputLabel htmlFor="Creacion" value="Creación:" className='px-4 pt-3'></InputLabel>
                        <CustomDatePicker
                            id="Creacion"
                            name="Creacion"
                            selected={data.Creacion ? parseISO(data.Creacion) : null}
                            onChange={(e) => setData('Creacion', e.target.value)}
                        />
                        <InputError message={errors.Creacion} className="mt-2" />
                    
                        <InputLabel htmlFor="Termino" value="Término:" className='px-4 pt-3'></InputLabel>
                        <CustomDatePicker
                            id="Termino"
                            name="Termino"
                            selected={data.Termino ? parseISO(data.Termino) : null}
                            onChange={(e) => setData('Termino', e.target.value)}
                        />
                        <InputError message={errors.Termino} className="mt-2" />
                    </div>
                    <div className='mt-2'>
                        <InputLabel htmlFor="TipoProblema" value="Tipo de Problema"></InputLabel>
                        <SelectInput
                            id="TipoProblema"
                            name="TipoProblema"
                            ref={tipoProblemaInput}
                            value={data.TipoProblema}
                            className="mt-1 block w-full"
                            handleChange={(e) => setData('TipoProblema', e.target.value)}
                            options={['Plataforma Neuuni', 
                            'Plataforma Gedux',
                             'Clase Sincronica']}
                            required
                        />
                        <InputError message={errors.TipoProblema} className="mt-2" />
                    </div>
                    <div className="flex justify-end mt-3">
                        <SecondaryButton onClick={closeModal} className="mr-2">Cancelar</SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>Guardar</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
