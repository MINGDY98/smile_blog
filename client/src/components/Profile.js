import React,{ useState,useRef } from 'react';
import axios from 'axios';
import {
  Avatar,
  Typography
} from '@mui/material';

const Profile = () => {

  const [Image, setImage] = useState("profile.png")
  const fileInput = useRef(null);
  const [ file, setFile ] = useState();
   const callLatestApi = async()=>{
    const response = await axios.get('http://localhost:4000/profile');
    return response.data.data;
  }

  React.useEffect(()=>{
    callLatestApi()
    .then(res=>{
      if(res!=null){//db에 img가 없으면 기본 프로필 배치.
        setImage(res.userImg);
      }
    })
    .catch( err=>console.log(err) );
  }, []);

  const handlePhoto = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0]);
      const img = URL.createObjectURL(e.target.files[0]);
      console.log(img);
      axios.put("http://localhost:4000/upload", { 
        "img"      : img, 
      }) 
      .then( function (response) {
        setImage(img);
      }) 
      .catch( error => {
        console.log('error : ',error.response) 
      });

    }else{
      return
    }
  };

  return (  
    <div>
      <Avatar
        src={Image} 
        style={{margin:'20px'}} 
        onClick={()=>{fileInput.current.click()}}/>
      <input 
        type='file' 
        style={{display:'none'}}
        accept='image/jpg,impge/png,image/jpeg' 
        name='profile_img'
        onChange={(e) => handlePhoto(e)}
        ref={fileInput}/>
      <Typography>안녕하세요.</Typography>
    </div>
  )
}
export default Profile;