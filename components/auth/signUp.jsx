//import { userLogin } from '@/helpers/auth/callbacks';
import { useAuthState } from '@/helpers/use-auth';
import { useState } from 'react';
import {  useRecoilValue } from 'recoil';
import { LoaderDualRing } from '../skeletons/Loaders';


function SignUp() {
const [viewPass, setViewPass] = useState(false);
const [data, setData] = useState({});
const [loading, setLoading] = useState(false);
const val = useRecoilValue(useAuthState);

const {userSignup} = val;


const onFinish = async(e) => {
    e.preventDefault();
    setLoading(true);
    const connect = await userSignup(data);
    setLoading(false);
};

  return (
                    <form>
                        <div class="input-style no-borders has-icon validate-field mt-2">
                            <i class="fa fa-at" style={{left: '8px'}}></i>
                            <input value={data.email ?? ''} required onChange={(e) => setData({...data, email: e.target.value})} name='useremail' type="email" class="form-control border rounded validate-name" id="form1aa" placeholder="Email"/>
                            <label for="form1aa" class="color-blue-dark font-10 mt-1">Email</label>
                            <i class="fa fa-times disabled invalid color-red-dark"></i>
                            <i class="fa fa-check disabled valid color-green-dark"></i>
                            <em>(required)</em>
                        </div>
                        <div className="input-style no-borders has-icon validate-field">
                            <i className="fa fa-user" style={{left: '8px'}}></i>
                            <input value={data.username ?? ''} required onChange={(e) => setData({...data, username: e.target.value})}  name='name' type="text" className="form-control border rounded validate-name" id="form1a" placeholder="Name"/>
                            <label htmlFor="form1a" className="color-blue-dark font-10 mt-1">Name</label>
                            <i className="fa fa-times disabled invalid color-red-dark"></i>
                            <i className="fa fa-check disabled valid color-green-dark"></i>
                            <em>(required)</em> 
                        </div>

                        <div className="input-style no-borders has-icon validate-field mt-4">
                            <i className="fa fa-lock" style={{left: '8px'}}></i>
                            <input value={data.password ?? ''} type={`${viewPass ? 'text' : 'password'}`} onChange={(e) => setData({...data, password: e.target.value})} required name='password' className="form-control border rounded validate-password pe-5" id="form3a" placeholder="Password"/>
                            <label htmlFor="form3a" className="color-blue-dark font-10 mt-1">Password</label>
                            <i className="fa fa-times disabled invalid color-red-dark"></i>
                            <i className="fa fa-check disabled valid color-green-dark"></i>
                            <i className={`bi bi-${viewPass ? 'eye-slash-fill' : 'eye-fill'} pass_view_toggle position-absolute right-0 px-10 d-block top-0`} onClick={() => setViewPass(!viewPass)}/>
                            
                        </div>

                    <button type={'submit'} onClick={(e) => onFinish(e)} className={`w-100 btn btn-full btn-m shadow-bg shadow-bg-m rounded-sm text-uppercase font-700 ${loading ? 'bg-night-light' : 'bg-highlight'}`}>{loading ? <LoaderDualRing size={30}/> : 'Create account'}</button>
                    </form>
  )
}
export default SignUp