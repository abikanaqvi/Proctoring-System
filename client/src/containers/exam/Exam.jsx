import React, { useState, useEffect } from 'react';
import { Timer, WebLiveCapture } from './../../components';
import devtools from './../../../node_modules/devtools-detect/index.js';
import './exam.css';

const Exam = ({
    examName = 'Testing - Bakwas: 27th September, 2024',
    studentID = '123456',
    studentEmail = 'abika9473@gmail.com',
    duration = 40,
    formLink = 'https://forms.gle/MwD1TNvmLwsuAAWV6',
}) => {
    const [warningCnt, setWarningCnt] = useState(0);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [showMessage, setShowMessage] = useState('');

    // TO EMBED
    formLink += '?embedded=true';

    const captureCheck = () => {
        // Default hidden
        const btn = document.querySelector(
            '#root > div > div > div.left-column > div.image-capture > button'
        );
        if (btn) btn.click();
    };

    const check = () => {
        // Check if the window is in fullscreen
        if (!window.screenTop && !window.screenY && isFullScreen) {
            setIsFullScreen(false);
        }

        if (!isFullScreen) {
            setWarningCnt((prev) => prev + 1);
            setShowMessage('Your exam will terminate. Please go to full screen mode.');
            disableForm();
        } else {
            enableForm();
        }

        terminateExam();
    };

    const terminateExam = () => {
        if (warningCnt > 5) {
            disableForm();
            document.getElementById('overlay').classList.add('terminate');
        }
    };

    const disableForm = () => {
        document.getElementById('overlay').classList.remove('hide');
        document.getElementById('overlay').classList.add('disable');
        document.getElementById('form-blur').classList.add('blur');
    };

    const enableForm = () => {
        document.getElementById('overlay').classList.add('hide');
        document.getElementById('overlay').classList.remove('disable');
        document.getElementById('form-blur').classList.remove('blur');
    };

    useEffect(() => {
        const handleDevToolsChange = (event) => {
            if (event.detail.isOpen) {
                setWarningCnt((prev) => prev + 1);
                setIsDevToolsOpen(true);
                setShowMessage('Your exam will terminate. Please close devtools.');
                disableForm();
            } else {
                setIsDevToolsOpen(false);
                enableForm();
            }
            terminateExam();
        };

        // Add event listener
        window.addEventListener('devtoolschange', handleDevToolsChange);

        // Set up intervals
        const fullscreenCheckInterval = setInterval(check, 10000);
        const captureCheckInterval = setInterval(captureCheck, 20000);

        // Cleanup function
        return () => {
            clearInterval(fullscreenCheckInterval);
            clearInterval(captureCheckInterval);
            window.removeEventListener('devtoolschange', handleDevToolsChange);
        };
    }, [warningCnt, isDevToolsOpen, isFullScreen]);

    return (
        <div className="exam-container">
            <div className="left-column">
                <div className="image-capture">
                    <WebLiveCapture />
                </div>
                <div className="exam-details">
                    <h3 className="title-heading">Student Details</h3>
                    <div className="details">
                        <h4 className="student-id">Student ID: {studentID}</h4>
                        <h4 className="student-email">Student Email: {studentEmail}</h4>
                    </div>
                </div>
            </div>

            <div className="embedded-form">
                <div className="hide" id="overlay">
                    <h2>Message: {showMessage}</h2>
                    <h2>Warnings: {warningCnt}</h2>
                    <h1>Exam Terminated</h1>
                    <h3>Please contact your organization/admin.</h3>
                </div>

                <div className="form" id="form-blur">
                    <h2 className="title-heading">{examName}</h2>
                    <iframe
                        title={examName}
                        className="form-link"
                        src={formLink}
                    >
                        Form
                    </iframe>
                    <div className="responsive-message">
                        <h1>Please join via a Laptop/PC for best performance</h1>
                    </div>
                </div>
            </div>

            <div className="timer">
                <Timer initialMinute={duration} />
            </div>
        </div>
    );
};

export default Exam;
