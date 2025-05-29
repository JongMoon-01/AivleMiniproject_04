import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Button from '@mui/material/Button';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/hello')
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.log('Hello API 호출 중 에러 발생: ', error);
                setMessage('백엔드 API 호출에 실패했습니다.');
            });
    }, []);

    return (
        <div style={{padding:'2rem'}}>
            <p>
                백엔드에서 받은 메시지: {message}
            </p>
            <Button variant="contained" onClick={() => alert('MUI 버튼 클릭!')}>
                MUI 버튼 테스트
            </Button>
        </div>
    )
}

export default App
