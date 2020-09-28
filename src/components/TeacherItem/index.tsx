import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg';


import './styles.css';
import Api from '../../services/api';

export interface Teacher {
    id: number;
    userId: number;
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
} 

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function createConnection() {
        Api.post('connections',{user_id: teacher.id})
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Img"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preco/Hora
                    <strong> R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createConnection} href={`https://wa.me/${teacher.whatsapp}`}> 
                    <img src={wppIcon} alt="contato"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;