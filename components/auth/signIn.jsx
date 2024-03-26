//import { WPDomain } from '@/helpers/base';
//import { userLogin } from '@/helpers/auth/callbacks';
import { closeMenus } from '@/helpers/appjs';
import { useAuthState } from '@/helpers/use-auth';
import { useState } from 'react';
import {  useRecoilValue } from 'recoil';
import { LoaderDualRing } from '../skeletons/Loaders';
import { snackNotification } from "@/contexts/signals"


function SignIn() {
const [viewPass, setViewPass] = useState(false);
const [data, setData] = useState({});
const [loading, setLoading] = useState(false);
const val = useRecoilValue(useAuthState);

const {userLogin} = val;

const controller = new AbortController();
const signal = controller.signal;


const onFinish = async(e) => {
    e.preventDefault();
    setLoading(true);
    const connect = await userLogin(data, signal);
    if(connect){
        console.log('connn', connect)

        const {success} = connect;
        controller.abort();
        setLoading(false);
        if(success){
            snackNotification.value = {
                color: 'green-dark',
                icon: 'fas fa-check',
                message : 'Logged in Successfully'}
                closeMenus();
        }else{
            snackNotification.value = {
                color: 'yellow-dark',
                icon: 'fas fa-times',
                message : 'Login Failed again. Check your credentials and try again'}
        }
    }
};

  return (
                    <form data-toast='failed'>
                        <div className="input-style no-borders has-icon validate-field">
                        <i className="fa fa-user" style={{left: '8px'}}></i>
                        <input value={data.username ?? ''} required onChange={(e) => setData({...data, username: e.target.value})}  name='name' type="text" className="form-control validate-name border rounded" id="form1a" placeholder="Name"/>
                        <label htmlFor="form1a" className="color-blue-dark font-12 mt-1 ms-3">Name</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em> 
                    </div>

                    <div className="input-style no-borders has-icon validate-field mt-4">
                        <i className="fa fa-lock" style={{left: '8px'}}></i>
                        <input value={data.password ?? ''} type={`${viewPass ? 'text' : 'password'}`} onChange={(e) => setData({...data, password: e.target.value})} required name='password' className="form-control validate-password pe-5 border rounded" id="form3a" placeholder="Password"/>
                        <label htmlFor="form3a" className="color-blue-dark font-12 mt-1 ms-3">Password</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <i className={`bi bi-${viewPass ? 'eye-slash-fill' : 'eye-fill'} pass_view_toggle position-absolute right-0 px-10 d-block top-0`} onClick={() => setViewPass(!viewPass)}/>
                        
                    </div>

                    <button type={'submit'} onClick={(e) => onFinish(e)} className={`w-100 btn btn-full btn-m shadow-bg shadow-bg-m rounded-sm text-uppercase font-700 ${loading ? 'bg-night-light' : 'bg-highlight'}`}>{loading ? <LoaderDualRing size={30}/> : 'Login'}</button>
                    </form>
  )
}
export default SignIn