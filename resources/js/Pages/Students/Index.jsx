import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useRef, useState } from 'react';
import React from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import WarningButton from '@/Components/WarningButton';
import DeleteButtom from '@/Components/DeleteButton';
import Swal from 'sweetalert2';


export default function Dashboard({ auth, students, props }) {
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState('');
    const [operation,setOperation] = useState(1);
    const NombreInput = useRef();
    const EmailInput = useRef();
    const TelInput = useRef();
    const {data,setData,delete:destroy,post,put,processing
        ,reset,errors} = useForm({
            id:'', nombre:'', email:'', tel:''
        });
        const openModal=(op,id,nombre,email,tel)=>{
         setModal(true);
         setOperation(op);
         setData({nombre:'',email:'',tel:''});
         if(op===1){
            setTitle('Añadir Estudiante');
         }
         else{
            setTitle('Editar datos');
            setData({id:id,nombre:nombre,email:email,tel:tel});
         }

        }
        const closeModal=()=>{
            setModal(false);
        }
        const save=()=>{
            
        }
    return (
        
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estudiantes</h2>}
        >
            <Head title="Estudiantes" />
            <div className="bg-white grid v-screen place-items-center">
                <div className='mt-3 mb-3 flex justify-end'>
                < PrimaryButton onClick={()=>openModal(1)}> 
                    <i className='fa-solid fa-plus-circle'></i>
                     Añadir
                    </ PrimaryButton >
                </div>
            <div className="bg-white grid v-screen place-items-center py-6">
               <table className='table-auto border border-gray-400'>
                 <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-2 py-2'>Id</th>
                        <th className='px-2 py-2'>Nombre</th>
                        <th className='px-2 py-2'>Email</th>
                        <th className='px-2 py-2'>Tel</th>
                        <th className='px-2 py-2'></th>
                        <th className='px-2 py-2'></th>
                    </tr>
                 </thead>
                 
                 <tbody>
              {students && students.map((student, i) => (
                <tr key={student.id}>
                  <td className='border border-gray-400 px-2 py-2'>{(i + 1)}</td>
                  <td className='border border-gray-400 px-2 py-2'>{student.Nombre}</td>
                  <td className='border border-gray-400 px-2 py-2'>{student.Email}</td>
                  <td className='border border-gray-400 px-2 py-2'>{student.Tel}</td>
                  <td className='border border-gray-400 px-2 py-2'>
                  <WarningButton onClick={()=>openModal(2,student.id,student.nombre,student.email,student.tel)}>
                    <i className='fa-solid fa-edit'></i>
                  </WarningButton>
                  </td>
                  <td className='border border-gray-400 px-2 py-2'>
                  <DeleteButtom>
                    <i className='fa-solid fa-trash'></i>
                  </DeleteButtom>
                  </td>
                </tr>
              ))}
            </tbody>
            
               </table>
            </div>
            </div>
            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={save} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
    
}
