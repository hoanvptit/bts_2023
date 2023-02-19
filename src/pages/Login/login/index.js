// ** Custom component
import { Link, useNavigate, redirect } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
// import auth from '../utility/auth';
// import storage from '../utility/storage';
// import { Redirect } from 'react-router';
// import PopupForgetPw from '~/components/popup/forgetPw';
// import PopupConfirm from '../room_students/popup/popup_confirm';
// import { Alert, Button } from 'react-bootstrap';
import { PopupConfirm, PopupForgetPw } from '~/components/popup';
import LoopCircleLoading from '~/components/loopCircle/LoopCircleLoading';

//** Reactstrap import */
import { Form, Input, Label, FormFeedback } from 'reactstrap';

//** Login Service */
import { isUserLoggedIn } from '~/util/auth';
import { login, handleLogin } from '~/services/loginService';
import classNames from 'classnames/bind';
import styles from './login.module.scss';

import { useForm, Controller } from 'react-hook-form';
const cx = classNames.bind(styles);

export default function Login2(props) {
    const navigate = useNavigate();

   
    const defaultValues = {
        password: 'admin',
        loginEmail: 'admin@demo.com',
    };

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });
    const [message, setMessage] = useState('');
    const [fg_email, setFg_email] = useState('');
    const [show, setShow] = useState(false);
    const [showInputPw, setShowInputPw] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [popup_title, setPopupTitle] = useState('Nhập email của bạn');
    const [processing, setProcessing] = useState(false);
    
    const onSubmit = (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            /*
            login({email:data.loginEmail, password: data.password})
            .then(res=>{
                handleLogin(data)
                navigate('/');

            })
*/
            console.log(data)
            handleLogin(data);
            navigate('/');
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual',
                    });
                }
            }
        }

        // if (user.username === '' || user.password === '') {
        //     setMessage('Bạn chưa nhập đủ thông tin');
        //     setShowAlert(true);
        // } else {
        //     setProcessing(true);

        //     await axios
        //         .post(`${process.env.REACT_APP_API_LOGIN}`, user)
        //         .then((response) => {
        //             setProcessing(false);

        //             let token = response.data.tokens.access.token;
        //             // storage.setToken(token);
        //             var x = response.data.user;
        //             // storage.setUser(x);
        //             if (response.status === 200) {
        //                 // handleAuth(response.data.user.id);
        //             }
        //         })
        //         .catch((error) => {
        //             setProcessing(false);

        //             setMessage('Đăng nhập thất bại, vui lòng kiểm tra lại username và password');
        //             setShowAlert(true);
        //         });
        // }
    };
    // const handleAuth = (userid) => {
    //     auth.login(() => {
    //         props.history.push(`/upcoming/${userid}`);
    //     });
    // };
    const forgetPass = () => {
        if (fg_email === '') {
            setPopupTitle('Quên mật khẩu');
            setMessage('Vui lòng điền email');
            setShow(true);
        } else {
            setProcessing(true);
            setPopupTitle('Quên mật khẩu');
            axios
                .post(`${process.env.REACT_APP_API_FORGET_PW}`, { email: fg_email })
                .then((response) => {
                    setProcessing(false);
                    if (response.status === '204') {
                        setMessage('Thành công! Vui lòng kiểm tra trong email');
                        setIsSend(true);
                        setShowInputPw(false);
                        setShow(true);
                    } else {
                        setMessage('Thất bại! Vui lòng kiểm tra lại');
                        setShow(true);
                    }
                })
                .catch((err) => {
                    setProcessing(false);
                    console.log('err: ', err);
                    setMessage('Thất bại! Vui lòng kiểm tra lại');
                    setShow(true);
                    setFg_email('');
                });
        }
    };
    const changeForgetUser = (newEmail) => {
        setFg_email(newEmail);
    };
    return (
        <>
            {processing && <LoopCircleLoading />}

            {!processing && show && (
                <PopupConfirm
                    title={popup_title}
                    message={message}
                    textBtn="Tiếp tục"
                    handleConfirm={() => setShow(false)}
                />
            )}

            {!processing && !show && showInputPw && (
                <PopupForgetPw
                    show={showInputPw}
                    isSend={isSend}
                    popup_title={popup_title}
                    onSend={forgetPass}
                    onChange={(e) => {
                        setPopupTitle('Nhập email của bạn');
                        setShowInputPw(false);
                        setFg_email('');
                        setIsSend(false);
                    }}
                    onChangeObject={changeForgetUser}
                />
            )}

            <div className={cx('form-app')}>
                {/* <div className={cx('intro')}></div> */}
                <div className={cx('login-form')}>
                    <Form action="" method="" className={cx('form')} id="form-1" onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('login-heading')}>
                            <p className={cx('desc')}>BTS Management 👋</p>
                            <h3 className={cx('heading')}>Đăng nhập tài khoản của bạn</h3>
                        </div>
                        <div className={cx('form-group')}>
                            <Label for="username" className={cx('form-label')}>
                                Tên tài khoản
                            </Label>
                            <Controller
                                id="loginEmail"
                                name="loginEmail"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        autoFocus
                                        type="email"
                                        placeholder="hoanv@gmail.com"
                                        className={cx('form-control')}
                                        invalid={errors.loginEmail && true}
                                        {...field}
                                    />
                                )}
                            />
                            {/* {errors.loginEmail && <p>sssssssssss</p>} */}
                            {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
                        </div>

                        <div className={cx('form-group')}>
                            <Label for="password" className={cx('form-label')}>
                                Mật khẩu
                            </Label>
                            <Controller
                                id="password"
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        autoFocus
                                        type="password"
                                        placeholder="................"
                                        className={cx('form-control')}
                                        invalid={errors.password && true}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className={cx('remember-forgot')}>
                            <div className={cx('remember-me')}>
                                <Label for="checkid" className={cx('form-label')}>
                                    <input id="checkid" type="checkbox" value="test" />
                                    Lưu đăng nhập!
                                </Label>
                            </div>

                            <p className={cx('forgot-pw')} onClick={(e) => setShowInputPw(true)}>
                                Quên mật khẩu?
                            </p>
                        </div>
                        {/* <Link to='/home'> */}
                        {/* <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="danger" dismissible> */}
                        {/* <Alert.Heading> {message}</Alert.Heading> */}
                        {/* <Button onClick={()=>setShowAlert(false)}>Tiếp tục</Button> */}
                        {/* </Alert> */}
                        <button className={cx('form-submit')} type="submit">
                            Đăng nhập
                        </button>
                        {/* </Link> */}
                        {/*

                            <button className={cx('form-sign-google')}>
                            <img src={icon_gg} />
                            Đăng nhập với Google
                        </button>
    */}
                        <p className={cx('login-to-register')}>
                            Bạn chưa có tài khoản?
                            <Link to="/register">
                                <a href="#"> Tham gia ngay</a>
                            </Link>
                        </p>
                    </Form>
                </div>
            </div>
        </>
    );
}
