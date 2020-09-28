import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';



function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''},
    ]);

    const history = useHistory();

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ]);
    };

    function setScheduleValue(position: number, field: string, val: string) {
        const updatedSchedule = scheduleItems.map((scheduleItem, index) => {
            if(position === index) {
               return { ...scheduleItem, [field]: val};
            };

            return scheduleItem;
        });
        setScheduleItems(updatedSchedule);
    };

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        Api.post('classes', {
            name,
            bio,
            avatar,
            subject,
            whatsapp,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado');
            history.push('/');
        }).catch(() => {
            alert('Erro ao cadastrar');
        });
    };
    
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que voce quer dar aulas"
                description="O primeiro passo e preencher esse formulario de inscricao"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}}/>
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Materia"
                            value={subject}
                            onChange={(e) => {setSubject(e.target.value)}}
                            options={[
                                {value: 'artes', label: 'Artes'},
                                {value: 'portugues', label: 'Portugues'},
                                {value: 'matematica', label: 'Matematica'},
                                {value: 'quimica', label: 'Quimica'},
                            ]}
                        />
                        <Input name="cost" label="Custo de hora/aula" value={cost} onChange={(e) => {setCost(e.target.value)}}/>
                    </fieldset>
                    <fieldset>
                        <legend>Horarios disponiveis
                            <button type="button" onClick={addScheduleItem}>
                                    + Novo Horario
                            </button>
                        </legend>
                            
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => {setScheduleValue(index, 'week_day', e.target.value)}}                                    
                                        options={[
                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda'},
                                            {value: '2', label: 'Terca'},
                                            {value: '3', label: 'Quarta'},
                                            {value: '4', label: 'Quinta'},
                                            {value: '5', label: 'Sexta'},
                                            {value: '6', label: 'Sabado'},
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        onChange={(e) => {setScheduleValue(index, 'from', e.target.value)}}
                                        value={scheduleItem.from}
                                    />
                                    <Input
                                        name="to"
                                        label="Ate"
                                        type="time"
                                        onChange={(e) => {setScheduleValue(index, 'to', e.target.value)}}
                                        value={scheduleItem.to}
                                    />
                                </div>
                            )
                        })}                    
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;