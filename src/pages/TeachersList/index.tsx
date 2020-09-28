import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


import './styles.css';
import Api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime]       = useState('');

    async function searchTeachersHandler(e: FormEvent) {
        e.preventDefault();
        const response = await Api.get('classes', {
            params: {
                week_day: weekDay,
                subject,
                time
            }   
        });
        setTeachers(response.data);
    };

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses sao os proffys disponiveis">
                <form id="search-teachers" onSubmit={searchTeachersHandler}>
                    <Select
                        name="subject"
                        label="Materia"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            {value: 'artes', label: 'Artes'},
                            {value: 'portugues', label: 'Portugues'},
                            {value: 'matematica', label: 'Matematica'},
                            {value: 'quimica', label: 'Quimica'},
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={weekDay}
                        onChange={(e) => setWeekDay(e.target.value)}
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
                    <Input type="time" name="time" label="Hora" value={time} onChange={(e) => setTime(e.target.value)}/>
                    <button type="submit">Pesquisar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;