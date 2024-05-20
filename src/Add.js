/**
 * @author Arjun 
 * @file Add.js
 * @description This file contains a React functional component for submitting a new pharmacy order request.
 * 
 * @requires React - For creating the component and managing state.
 * @requires Firebase - For Firestore database operations and file storage.
 * 
 * @component
 * The Add component allows users to submit a new order request by filling out a form with details
 * such as medicine name, location, company name, explanation, date, and type. Users can also upload an image
 * related to the order. The form data is validated before submission, and if valid, it is stored in a Firestore 
 * collection. The uploaded image is stored in Firebase Storage.
 * 
 * @function Add - The main React functional component.
 * @property {object} state - The component's state includes:
 * - `selectedFile`: Tracks the selected file for upload.
 * - `selectedImg`: Stores the URL of the uploaded image.
 * - `name`: Stores the name of the medicine.
 * - `location`: Stores the location related to the order.
 * - `companyName`: Stores the name of the company making the order.
 * - `explanation`: Stores additional explanation or quantity details.
 * - `date`: Stores the date of the order.
 * - `type`: Stores the type or branch of the order.
 * - `buttonDisable`: Boolean state to manage the submit button's disabled state.
 * 
 * @method handleFileChange - Handles the file selection and upload to Firebase Storage.
 * @method addEvent - Validates the form data and adds the order to the Firestore collection.
 * @method handleName - Updates the state for the medicine name.
 * @method handleCompanyName - Updates the state for the company name.
 * @method handleLocation - Updates the state for the location.
 * @method handleDate - Updates the state for the date.
 * @method handleType - Updates the state for the order type.
 * @method handleExplanation - Updates the state for the explanation.
 * 
 * @returns {JSX.Element} The JSX code for rendering the order submission form.
 * 
 * @example
 * <Add />
 * 
 * @see {@link https://reactjs.org/|React}
 * @see {@link https://firebase.google.com/|Firebase}
 */
import React, {useState} from 'react'
import robot from "./assets/pharmacy-logo-big.png"
import upload from "./assets/upload-icon.png"
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

    // const handleFileChange = async (event) => {
    //   setSelectedFile('Loading');
    //     const file = event.target.files[0];
    //     const imgs = ref(storage, `Imgs/${v4()}`);
        
    //     try {
    //       const [uploadResult] = await Promise.all([
    //         uploadBytes(imgs, file),
    //       ]);
      
    //       const downloadURL = await getDownloadURL(uploadResult.ref);
    //       setSelectedImg(downloadURL);
    //       setSelectedFile(file);
    //     } catch (error) {
    //       console.error('Error uploading file:', error);
    //     }
    //   };
    const handleFileChange = async (event) => {
      console.log("File change event triggered.");

      setSelectedFile('Loading');
        const file = event.target.files[0];
        const imgRef = ref(storage, `Imgs/${v4()}`);
        
        try {
          console.log("Uploading file to Firebase Storage..."); // firebase go
          const [uploadResult] = await Promise.all([
            uploadBytes(imgRef, file),
          ]);
      
          const downloadURL = await getDownloadURL(uploadResult.ref);
          setSelectedImg(downloadURL);
          setSelectedFile(file);
          console.log("File uploaded successfully:", downloadURL); // done, uploaded succeccfully kk
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


