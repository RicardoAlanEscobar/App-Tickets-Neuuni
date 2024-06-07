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
import Go from '@/Components/DeleteButton';
import TextInput from '@/Components/TextInput';
import WarningButton from '@/Components/WarningButton';
import DangerButton from '@/Components/DangerButton';

export default function Dashboard({ auth, students }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const NombreInput = useRef();
    const EmailInput = useRef();
    const TelInput = useRef();
    const CarreraInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, reset, errors } = useForm({
        id: '', Nombre: '', Email: '', Tel: '', Carrera: ''
    });

    const openModal = (op, id = '', Nombre = '', Email = '', Tel = '', Carrera = '') => {
        setModal(true);
        setOperation(op);
        if (op === 1) {
            setTitle('Añadir Estudiante');
            setData({ Nombre: '', Email: '', Tel: '', Carrera: '' });
        } else {
            setTitle('Editar datos');
            setData({ id, Nombre, Email, Tel, Carrera });
        }
    }

    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('students.store'), {
                onSuccess: () => { ok('¡Estudiante Añadido!') },
                onError: handleErrors
            });
        } else {
            put(route('students.update', data.id), {
                onSuccess: () => { ok('¡Estudiante Modificado!') },
                onError: handleErrors
            });
        }
    }

    const handleErrors = () => {
        console.log(errors);
        if (errors.Nombre) {
            reset('Nombre');
            NombreInput.current.focus();
        }
        if (errors.Email) {
            reset('Email');
            EmailInput.current.focus();
        }
        if (errors.Tel) {
            reset('Tel');
            TelInput.current.focus();
        }
        if (errors.Carrera) {
            reset('Carrera');
            CarreraInput.current.focus();
        }
    }

    const ok = (mensaje) => {
        reset();
        closeModal();
        Swal.fire({ title: mensaje, icon: 'success' });
    }

    const eliminar = (id, name) => {
        const alerta = Swal.mixin({ buttonsStyling: true });
        alerta.fire({
            title: '¿Seguro que quiere eliminar este campo?',
            text: 'Se perderan los datos definitivamente',
            icon: 'question', showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('students.destroy', id), { onSuccess: () => { ok('¡Estudiante Eliminado!') } });
            }
        });
    }

    const itemsPerPage = 10;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const filteredStudents = searchTerm ? students.filter(student =>
        student.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) : students;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
    const currentStudents = filteredStudents.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); 
    };

    return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-2xl text-gray-800 leading-tight"><i class="fa-solid fa-graduation-cap mr-2"></i>Estudiantes</h2>}
    >
        <Head title="Estudiantes" />
        <div className="grid min-h-screen place-items-center bg-gray-100 p-4 ">
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
                    Añadir Estudiante
                </PrimaryButton>
            </div>
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-md  ">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-4 py-2 text-center">Id</th>
                            <th className="px-4 py-2 text-center">Nombre</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Teléfono</th>
                            <th className="px-4 py-2 text-center">Carrera</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student, i) => (
                            <tr key={student.id} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-4 py-2 text-center">{startIndex + i + 1}</td>
                                <td className="px-4 py-2 text-center">{student.Nombre}</td>
                                <td className="px-4 py-2 text-center">{student.Email}</td>
                                <td className="px-4 py-2 text-center">{student.Tel}</td>
                                <td className="px-4 py-2 text-center">{student.Carrera}</td>
                                <td className="px-4 py-2 text-center flex justify-center">
                                    <WarningButton onClick={() => openModal(2, student.id, student.Nombre, student.Email, student.Tel, student.Carrera)} className="mr-2">
                                        <i className="fa-solid fa-user-pen"></i>
                                    </WarningButton>
                                    <DangerButton onClick={() => eliminar(student.id, student.Nombre)} className="mr-2">
                                        <i className="fa-solid fa-trash"></i>
                                    </DangerButton>
                                    <Go>
                                        <i className="fa-solid fa-up-right-from-square"></i>
                                    </Go>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <div className="flex justify-center w-full py-2">
                <ReactPaginate
                    previousLabel={<button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"><i className="fas fa-chevron-left"></i></button>}
                    nextLabel={<button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"><i className="fas fa-chevron-right"></i></button>}
                    breakLabel={<span className="px-3 py-2">...</span>}
                    pageCount={Math.ceil(filteredStudents.length / itemsPerPage)}
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
                <h2 className="px-6 pt-6 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <form onSubmit={save} className="px-6 py-4">
                    <div className="mt-4">
                        <InputLabel htmlFor="Nombre" value="Nombre" />
                        <TextInput
                            id="Nombre"
                            name="Nombre"
                            ref={NombreInput}
                            value={data.Nombre}
                            className="block w-full mt-1"
                            autoComplete="Nombre"
                            isFocused={true}
                            onChange={(e) => setData('Nombre', e.target.value)}
                            required
                        />
                        <InputError message={errors.Nombre} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="Email" value="Email" />
                        <TextInput
                            id="Email"
                            name="Email"
                            ref={EmailInput}
                            value={data.Email}
                            className="block w-full mt-1"
                            autoComplete="Email"
                            onChange={(e) => setData('Email', e.target.value)}
                            required
                        />
                        <InputError message={errors.Email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="Tel" value="Telefono" />
                        <TextInput
                            id="Tel"
                            name="Tel"
                            ref={TelInput}
                            value={data.Tel}
                            className="block w-full mt-1"
                            autoComplete="Tel"
                            onChange={(e) => setData('Tel', e.target.value)}
                            required
                        />
                        <InputError message={errors.Tel} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="Carrera" value="Carrera" />
                        <SelectInput
                            id="Carrera"
                            name="Carrera"
                            ref={CarreraInput}
                            value={data.Carrera}
                            className="block w-full mt-1"
                            handleChange={(e) => setData('Carrera', e.target.value)}
                            options={['Administracion de negocios', 'Mercadotecnia y diseño', 'Ingenieria Industrial', 'Derecho', 'Doctorado en Pedagodia', 'Maestria en Administracion y direccion empresarial', 'Maestria en direccion de empresas industriales', 'Maestria en Pedagodia', 'Maestria en Sistema Penal Acusatorio']}
                            required
                        />
                        <InputError message={errors.Carrera} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton processing={processing} className="mr-2">
                            <i className="fa-solid fa-save mr-1"></i> Guardar
                        </PrimaryButton>
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
