import React, {useState} from 'react'
import robot from "./assets/pharmacy-logo-big.png"
import logo from "./assets/Logo1.png"
import upload from "./assets/upload-icon.png"
import calendar from "./assets/calendar-icon.png"
import "./style/Register.css"
import Input from './components/Input'
import Button from './components/Button'
import Contact from './components/Contact'
import { firestore, storage } from './FirebaseConfig'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImg, setSelectedImg] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [explanation, setExplanation] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('Select Type');
    const history = useNavigate();
    const [buttonDisable, setButtonDisable] = useState(true);

    const handleFileChange = async (event) => {
      setSelectedFile('Loading');
        const file = event.target.files[0];
        const imgs = ref(storage, `Imgs/${v4()}`);
        
        try {
          const [uploadResult] = await Promise.all([
            uploadBytes(imgs, file),
          ]);
      
          const downloadURL = await getDownloadURL(uploadResult.ref);
          setSelectedImg(downloadURL);
          setSelectedFile(file);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      const addEvent = async () => {
        const valRef = collection(firestore, "Events");
      
        if (name === '' || companyName === '' || location === '' || explanation === '' || date === '' || type === 'Select type' || selectedFile == 'Loading') {
          alert("Бүх талбарыг гүйцэт бөглөнө үү");
        } else {
          try {
            await addDoc(valRef, {
              eventName: name,
              companyName: companyName,
              location: location,
              explanation: explanation,
              date: date,
              type: type,
              img: selectedImg,
            });
      
            history("/");
          } catch (error) {
            console.error('Error adding event:', error);
            // Handle the error appropriately, e.g., show an error message
          }
        }
      };
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleDate = (e) => {
        setDate(e.target.value);
    }
    const handleType = (e) => {
        setType(e.target.value);
    }
    const handleExplanation = (e) => {
        setExplanation(e.target.value);
    }
    return (
        <div className='register'>
          <img src={robot} className='register-robot'/>
          {/* <img src={logo} className='logo1'/> */}

          <div className='register-inputs'>
            <h2>Эмийн шинэ захиалгын хүсэлт гаргах</h2>
            <div className='inputs'>
            <Input inputName="Эмийн нэр" inputfunctionName={handleName}/>
            <Input inputName="Байршил" inputfunctionName={handleLocation}/>
            <Input inputName="Байгууллага" inputfunctionName={handleCompanyName}/>
            <Input inputName="Нэмэлт тайлбар, тоо ширхэг" inputfunctionName={handleExplanation}/>
            <div className='small-inputs'>
                <div className='small-input'>
                    <label for="date">
                    Огноо</label>
                    <input type='date' name='date' id='date' onChange={handleDate}/>
                </div>
                <div className='small-input'>
                <label for="select">
                    Салбар</label>
                <select className='custom-select-input' onChange={handleType}>
                    <option value="someOption">Салбар сонгох</option>
                    <option value="Жуков">Жуков</option> {/*value = jukov*/}
                    <option value="Талбай">Талбай</option>
                    <option value="Модны хоёр">Модны хоёр</option>
                    <option value="Багшийн дээд">Багшийн дээд</option>
                    <option value="МУИС">МУИС</option>
                    <option value="ШУТИС">ШУТИС</option>
                    <option value="АШУИС">АШУИС</option>
                 </select>
                </div>
                <div className='small-input'>
                    <label for="file">
                    Захиалга зураг</label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => handleFileChange(e)}
                        style={{ display: 'none' }}
                    />
                     <label htmlFor="fileInput" className="custom-file-input">
                        <img src={upload}/>
                    </label>
                    {selectedFile && (
                        selectedFile=='Loading' ? (
                          <div className="file-label">
                            Loading...
                          </div>
                        ) : (
                          <div className="file-label">
                            Амжилттай!
                            {/* Амжилттай: {selectedFile.name} */}
                        </div>
                        )
                    )}
                </div>
                
            </div>
    
            </div>
            <Button name="Захиалах" functionName={addEvent} disable={buttonDisable? true:false} />
            <div className='other'>
                <Contact/>
            </div>
          </div>
        </div>
      )
}

export default Add
