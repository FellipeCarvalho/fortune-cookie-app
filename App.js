import React,{useState, useEffect} from "react"
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';

const App = () =>  {
  const  [message, setMessage] = useState("");
  const  [showMessage, setShowMessage] = useState(false);
  const [imageUri, setImageUri] = useState(require('./assets/closeCookie.png'))
  const [buttonText, setButtonText] = useState("Quebrar Biscoito")
  const [sound, setSound] = useState();
  const [info, setInfo] = useState("BISCOITO DAS DECISÕES")

  const allCookieMessages = ["Hoje não...", "Você que decide!", "Seja mais objetivo, não precisa enrolar!", "Que pensamento é esse. Pensa de novo.", "Sim, com certeza!", "Não, de forma alguma!", "Vai dar certo, pode apostar!", "Talvez não seja dessa vez :/", "Você poderia decidir isso se pensar um pouco mais", "Não vou te dar essa reposta", "De novo sério?!", "Amanhã vai ser outro dia, já ouviu essa?!", "Faz de tudo para que sim", "É só você querer", "Não, nem pensar nisso!", "Muda tudo e vê se isso faz sentido", "Pode ser que sim", "Talvez", "Simplesmente não tenho ideias", "Aff! Chega por hoje", "Vai com tudo", "Não tem porque esperar certas coisas", "Paciência que vai acontecer aos poucos", "Não precisa ter tanta paciência, vai com tudo!", "O dia ta bom para resolver essa questão", "Vai acontecer o que tiver que acontecer", "Vai acontecer o que você fizer acontecer.", "A resposta não vai estar aqui", "Todos tem sua sorte, use a sua", "Não vai acontecer se você não quiser que aconteça" ]

  const newCookie =  () =>{
    setShowMessage(false)
    setImageUri(require('./assets/closeCookie.png'))
  }

  const handlePressGetNewCookie = () =>{
    setInfo("Seja objetivo, pergunte e então quebre seu biscoito das decisões.")
    setShowMessage(true)
    setMessage("")
    setImageUri(require('./assets/closeCookie.png'))
  }
  const handleOnPress = async () =>{
    if(message){
      newCookie()
      return 
    }
     await playSound()
     const allCookieMessagesSorted = allCookieMessages.sort();
    const getOneMessage = Math.floor(Math.random() * allCookieMessages.length)
    setImageUri(require('./assets/openCookie.png'))
    setMessage(`" ${allCookieMessagesSorted[getOneMessage]} "`)
    setShowMessage(true)
    setInfo("Outro biscoito?")
  }

  const playSound = async () =>{
    try{

  
    const { sound } = await Audio.Sound.createAsync(require('./assets/breaking.mp3'));
    setSound(sound);
    await sound.playAsync();
  } catch(err){
    console.log("err",err )
  }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

return(
  <View style={styles.mainContainer}>
    {/* <View style={styles.inforWrapper}>    
      <Text style={styles.textInfo}>{info}</Text>
  </View> */}
  
    { message && <TouchableOpacity onPress={handlePressGetNewCookie}> 
      <Image style={styles.cookieReload}source={require('./assets/reload.png')}/>
   </TouchableOpacity>}
  <Image style={styles.cookieImage}source={imageUri}/>
  <Text style={styles.cookieMessage}>{message}</Text>

  {!message && <TouchableOpacity style={styles.button} onPress={handleOnPress}> 
     <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{buttonText}</Text>
    </View>
  </TouchableOpacity>
  }
  
  </View>
)
}
export default App

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  cookieImage:{
    width:250,
   height:250
  },
  cookieMessage:{
    fontSize:20,
    color:"#dd7b22",
    margin:30,
    fontStyle:"italic",
    textAlign:'center',
  },
  button:{
    width:230,
    height:50,
    borderWidth:2,
    borderColor: "#dd7b22",
    borderRadius:25,
   
  },
  buttonContent:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    

  },
  buttonText:{
    fontSize:16,
    fontWeight:"bold",
    color:"#dd7b22",
  },
  cookieReload:{
    width:50,
   height:50
  },

  textInfo:{
  
    margin:60,
fontSize:25,
fontWeight:"bold",
color:"#dd7b22",
textAlign:"center"


  },
  infoWrapper:{
   flex:1,
 
   justifyContent:"center",
   alignItems:"center",
   alignContent:"center",

      },
})


