// // import React, { useEffect, useState } from 'react';
// // import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// // import { Appbar, TextInput, Button, Text } from 'react-native-paper';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { useNavigation } from '@react-navigation/native';
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { getUserName } from '../../functions/getUserName';
// // import { getUserId } from '../../functions/getUserId';
// // import { api } from '../../lib/axios';

// // type RootStackParamList = {
// //   Login: undefined;
// //   Register: undefined;
// //   Home: undefined;
// // };

// // const apiKey = "AIzaSyDD7vyh_K96TY6CHgPzpp90BvisCcIOIjk";
// // const genAI = new GoogleGenerativeAI(apiKey);
// // const model = genAI.getGenerativeModel({
// //   model: "gemini-1.5-flash",
// //   systemInstruction: "Você é um chatbot especializado em criar dietas saudáveis e personalizadas, proporcionando uma experiência de conversa amigável e envolvente para o usuário. Responda apenas a perguntas relacionadas a dietas.",
// // });

// // const generationConfig = {
// //   temperature: 2,
// //   topP: 0.95,
// //   topK: 64,
// //   maxOutputTokens: 8192,
// //   responseMimeType: "text/plain",
// // };

// // export default function ChatScreen() {
// //   const [userName, setUserName] = useState<string | null>(null);
// //   const [userId, setUserId] = useState<string | null>(null);
// //   const [messages, setMessages] = useState<{ id: number; text: string; sender: 'incoming' | 'outgoing' }[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [userData, setUserData] = useState({
// //     allergy: '',
// //     healthCondition: '',
// //     goal: '',
// //     vegan: '',
// //     eatingTimes: '',
// //   });
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// //   useEffect(() => {
// //     const fetchUserName = async () => {
// //       try {
// //         const name = await getUserName();
// //         setUserName(name);
// //         const id = await getUserId();
// //         setUserId(id);
// //       } catch (error) {
// //         console.log('Erro ao buscar o nome do usuário:', error);
// //       }
// //     };
// //     fetchUserName();
// //   }, []);

// //   useEffect(() => {
// //     if (userName) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         {
// //           id: 1,
// //           text: `Olá ${userName}! Para te ajudar a criar uma dieta personalizada, preciso de algumas informações. 😊\n\n* Você tem alguma alergia ou restrição alimentar?`,
// //           sender: 'incoming',
// //         },
// //       ]);
// //     }
// //   }, [userName]);

// //   const sendMessageToAI = async (userMessage: string) => {
// //     try {
// //       const chatSession = model.startChat({
// //         generationConfig,
// //         history: [
// //           {
// //             role: "user",
// //             parts: [{ text: userMessage }],
// //           },
// //         ],
// //       });

// //       const result = await chatSession.sendMessage(userMessage);
// //       const aiResponse = result.response.text() || "Desculpe, não consegui gerar uma receita.";

// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: aiResponse, sender: 'incoming' },
// //       ]);
// //     } catch (error) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Erro ao gerar a resposta da IA.", sender: 'incoming' },
// //       ]);
// //       console.error(error);
// //     }
// //   };

// //   const handleUserResponse = (message: string) => {
// //     if (!userData.allergy) {
// //       setUserData((prev) => ({ ...prev, allergy: message }));
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Ótimo! E você possui alguma condição de saúde?", sender: 'incoming' },
// //       ]);
// //     } else if (!userData.healthCondition) {
// //       setUserData((prev) => ({ ...prev, healthCondition: message }));
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Qual o seu objetivo com a dieta? Emagrecer, ganhar peso ou ganhar massa muscular?", sender: 'incoming' },
// //       ]);
// //     } else if (!userData.goal) {
// //       setUserData((prev) => ({ ...prev, goal: message }));
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Você é vegano? Responda com 'sim' ou 'não'.", sender: 'incoming' },
// //       ]);
// //     } else if (!userData.vegan) {
// //       setUserData((prev) => ({ ...prev, vegan: message.toLowerCase() }));
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Quais são seus horários de alimentação habituais?", sender: 'incoming' },
// //       ]);
// //     } else if (!userData.eatingTimes) {
// //       setUserData((prev) => ({ ...prev, eatingTimes: message }));
// //       generateDiet();
// //     }
// //   };
  
// //   const generateDiet = async () => {
// //     const { allergy, healthCondition, goal, vegan, eatingTimes } = userData;

// //     const dietPrompt = `Você tem as seguintes informações para criar uma dieta:\n
// //     Alergia: ${allergy}\n
// //     Condição de saúde: ${healthCondition}\n
// //     Objetivo: ${goal}\n
// //     Vegano: ${vegan ? "Sim" : "Não"}\n
// //     Horários de alimentação: ${eatingTimes}\n
// //     Agora, gere um plano alimentar detalhado.`;

// //     try {
// //       const chatSession = model.startChat({
// //         generationConfig,
// //         history: [
// //           {
// //             role: "user",
// //             parts: [{ text: dietPrompt }],
// //           },
// //         ],
// //       });

// //       const result = await chatSession.sendMessage(dietPrompt);
// //       const aiResponse = result.response.text() || "Desculpe, não consegui gerar a dieta.";

// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: aiResponse, sender: 'incoming' },
// //       ]);
// //     } catch (error) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: "Erro ao gerar a dieta.", sender: 'incoming' },
// //       ]);
// //       console.error(error);
// //     }
// //   };

// //   const sendMessage = () => {
// //     if (newMessage.trim()) {
// //       const userMessage = newMessage;
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { id: prevMessages.length + 1, text: userMessage, sender: 'outgoing' },
// //       ]);
// //       setNewMessage('');

// //       handleUserResponse(userMessage);
// //     }
// //   };

// //   const saveRecipe = async (content: string) => {
// //     try {
// //       const clientId = userId;
// //       const response = await api.post("/receitas", { content, clientId });
// //       const recipeId = response.data.recipe.id; 
// //       await api.post("/favoritos", { recipeId, clientId });

// //       console.log("Receita salva com sucesso!");
// //     } catch (error) {
// //       console.error("Erro ao salvar a receita:", error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Appbar.Header style={styles.header}>
// //         <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
// //         <Appbar.Content title="Faça sua dieta" />
// //         <Appbar.Action icon="dots-vertical" onPress={() => { }} />
// //       </Appbar.Header>

// //       <KeyboardAvoidingView
// //         style={styles.chatContainer}
// //         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //         keyboardVerticalOffset={80}
// //       >
// //         <ScrollView contentContainerStyle={styles.messagesContainer}>
// //           {messages.map((message) => (
// //             <View
// //               key={message.id}
// //               style={[styles.messageBubble, message.sender === 'outgoing' ? styles.outgoing : styles.incoming]}
// //             >
// //               <Text style={styles.messageText}>{message.text}</Text>
// //               {message.sender === 'incoming' && message.text.includes("Almoço") && (
// //                 <Button mode="contained" onPress={() => saveRecipe(message.text)}>
// //                   Salvar Receita
// //                 </Button>
// //               )}
// //             </View>
// //           ))}
// //         </ScrollView>

// //         <View style={styles.inputContainer}>
// //           <TextInput
// //             mode="outlined"
// //             label="Mensagem"
// //             value={newMessage}
// //             onChangeText={setNewMessage}
// //             style={styles.input}
// //           />
// //           <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
// //             Enviar
// //           </Button>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#E6F4EA',
// //   },
// //   header: {
// //     backgroundColor: '#4CAF50',
// //   },
// //   chatContainer: {
// //     flex: 1,
// //   },
// //   messagesContainer: {
// //     padding: 10,
// //   },
// //   messageBubble: {
// //     maxWidth: '70%',
// //     borderRadius: 20,
// //     padding: 10,
// //     marginVertical: 5,
// //   },
// //   outgoing: {
// //     backgroundColor: '#C8E6C9',
// //     alignSelf: 'flex-end',
// //   },
// //   incoming: {
// //     backgroundColor: '#FFFFFF',
// //     alignSelf: 'flex-start',
// //   },
// //   messageText: {
// //     fontSize: 16,
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 10,
// //     backgroundColor: '#F1F8E9',
// //   },
// //   input: {
// //     flex: 1,
// //     marginRight: 10,
// //     backgroundColor: '#FFF',
// //   },
// //   sendButton: {
// //     backgroundColor: '#388E3C',
// //   },
// // });



// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { Appbar, TextInput, Button, Text } from 'react-native-paper';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { getUserName } from '../../functions/getUserName';
// import { getUserId } from '../../functions/getUserId';
// import { api } from '../../lib/axios';

// type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
// };

// const apiKey = "API_KEY";
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   systemInstruction: "Você é um chatbot especializado em criar receitas saudáveis e nutritivas para o usuário, mantendo uma conversa amigável e motivadora. Responda apenas com receitas.",
// });

// const generationConfig = {
//   temperature: 2,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// export default function ChatScreen() {
//   const [userName, setUserName] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<{ id: number; text: string; sender: 'incoming' | 'outgoing' }[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   useEffect(() => {
//     const fetchUserName = async () => {
//       try {
//         const name = await getUserName();
//         setUserName(name);
//         const id = await getUserId();
//         setUserId(id);
//       } catch (error) {
//         console.log('Erro ao buscar o nome do usuário:', error);
//       }
//     };
//     fetchUserName();
//   }, []);

//   useEffect(() => {
//     if (userName) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           id: 1,
//           text: `Olá ${userName}! Me diga que tipo de receita saudável você gostaria hoje!`,
//           sender: 'incoming',
//         },
//       ]);
//     }
//   }, [userName]);

//   const sendMessageToAI = async (userMessage: string) => {
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [
//           {
//             role: "user",
//             parts: [{ text: userMessage }],
//           },
//         ],
//       });

//       const result = await chatSession.sendMessage(userMessage);
//       const aiResponse = result.response.text() || "Desculpe, não consegui gerar uma receita.";

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: aiResponse, sender: 'incoming' },
//       ]);
//     } catch (error) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: "Erro ao gerar a resposta da IA.", sender: 'incoming' },
//       ]);
//       console.error(error);
//     }
//   };

//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       const userMessage = newMessage;
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: userMessage, sender: 'outgoing' },
//       ]);
//       setNewMessage('');

//       sendMessageToAI(userMessage);
//     }
//   };

//   const saveRecipe = async (content: string) => {
//     try {
//       const clientId = userId;
//       const response = await api.post("/receitas", { content, clientId });
//       const recipeId = response.data.recipe.id; 
//       await api.post("/favoritos", { recipeId, clientId });

//       console.log("Receita salva com sucesso!");
//     } catch (error) {
//       console.error("Erro ao salvar a receita:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Appbar.Header style={styles.header}>
//         <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
//         <Appbar.Content title="Receitas Saudáveis" />
//         <Appbar.Action icon="dots-vertical" onPress={() => { }} />
//       </Appbar.Header>

//       <KeyboardAvoidingView
//         style={styles.chatContainer}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={80}
//       >
//         <ScrollView contentContainerStyle={styles.messagesContainer}>
//           {messages.map((message) => (
//             <View
//               key={message.id}
//               style={[styles.messageBubble, message.sender === 'outgoing' ? styles.outgoing : styles.incoming]}
//             >
//               <Text style={styles.messageText}>{message.text}</Text>
//               {message.sender === 'incoming' && message.text.includes("Preparo:") && (
//                 <Button mode="contained" onPress={() => saveRecipe(message.text)}>
//                   Salvar Receita
//                 </Button>
//               )}
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.inputContainer}>
//           <TextInput
//             mode="outlined"
//             label="Mensagem"
//             value={newMessage}
//             onChangeText={setNewMessage}
//             style={styles.input}
//           />
//           <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
//             Enviar
//           </Button>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E6F4EA',
//   },
//   header: {
//     backgroundColor: '#4CAF50',
//   },
//   chatContainer: {
//     flex: 1,
//   },
//   messagesContainer: {
//     padding: 10,
//   },
//   messageBubble: {
//     maxWidth: '70%',
//     borderRadius: 20,
//     padding: 10,
//     marginVertical: 5,
//   },
//   outgoing: {
//     backgroundColor: '#C8E6C9',
//     alignSelf: 'flex-end',
//   },
//   incoming: {
//     backgroundColor: '#FFFFFF',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#F1F8E9',
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//     backgroundColor: '#FFF',
//   },
//   sendButton: {
//     backgroundColor: '#388E3C',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getUserName } from '../../functions/getUserName';
import { getUserId } from '../../functions/getUserId';
import { api } from '../../lib/axios';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const apiKey = "AIzaSyDD7vyh_K96TY6CHgPzpp90BvisCcIOIjk";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // systemInstruction: "Você é um chatbot especializado em criar dietas saudáveis e personalizadas, proporcionando uma experiência de conversa amigável e envolvente para o usuário. Seja direto e objetivo: logo na primeira mensagem, pergunte ao usuário todas as informações essenciais para criar a dieta, incluindo se ele tem alguma alergia ou restrição alimentar, se possui condições de saúde, se deseja uma dieta para emagrecer, ganhar peso ou ganhar massa muscular, se é vegano, e quais são seus horários de alimentação habituais. Receba todas essas informações na primeira interação para montar um plano alimentar totalmente focado nas necessidades do usuário. Ao gerar a dieta, sempre inclua o título padrão \"Sua dieta\" no início, seguido de um plano detalhado com horários e instruções para cada refeição, adaptado aos objetivos informados pelo usuário. Responda apenas a perguntas relacionadas a dietas; se o usuário perguntar sobre qualquer outro tema, gentilmente informe que você só responde questões sobre dietas",
  systemInstruction: "Você é um chatbot divertido e cheio de charme, especializado em criar receitas saudáveis e personalizadas para o público fitness. Com um toque de humor e até um pouco de charme, faça o usuário rir enquanto sugere receitas saborosas e práticas. Use emojis para deixar tudo mais leve e envolvente, e sempre comece as respostas com o título 'Sua receita'. As instruções de preparo devem ser detalhadas e, se o usuário não gostar da receita, ofereça a opção de outra sugestão. Responda exclusivamente a perguntas sobre receitas; para outros tópicos, avise gentilmente que você é um chatbot de receitas.",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export default function ChatScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'incoming' | 'outgoing' }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getUserName();
        setUserName(name);
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.log('Erro ao buscar o nome do usuário:', error);
      }
      console.log("id:", userId);
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    if (userName) {
      setMessages([
        {
          id: 1,
          // text: `Olá ${userName}, ${userId}! Me diga qual é o seu objetivo: emagrecer, ganhar músculos ou algo mais?`,
          text: `Olá prazer em ter conhecer ${userName}, me fale qual receita você quer`,
          sender: 'incoming',
        },
      ]);
    }
  }, [userName]);

  const sendMessageToAI = async (userMessage: string) => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [{ role: "user", parts: [{ text: userMessage }] }],
      });

      const result = await chatSession.sendMessage(userMessage);
      const aiResponse = result.response.text() || "Desculpe, não consegui gerar uma receita.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: aiResponse, sender: 'incoming' },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "Erro ao gerar a resposta da IA.", sender: 'incoming' },
      ]);
      console.error(error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = newMessage;
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: userMessage, sender: 'outgoing' },
      ]);
      setNewMessage('');

      sendMessageToAI(userMessage);
    }
  };

  const saveRecipe = async (content: string) => {
    try {
      const clientId = userId
      const response = await api.post("/receitas", { content, clientId });
      // console.log(response)
      const recipeId = response.data.recipe.id;
      // const clientId = userId; 


      await api.post("/favoritos", { recipeId, clientId });

      console.log("Receita salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="Faça sua dieta" />
        <Appbar.Action icon="dots-vertical" onPress={() => { }} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.messagesContainer}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'outgoing' ? styles.outgoing : styles.incoming,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              {message.sender === 'incoming' && message.text.includes("Preparo:") && (
                <Button mode="contained" onPress={() => saveRecipe(message.text)}>
                  Salvar Receita
                </Button>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Mensagem"
            value={newMessage}
            onChangeText={setNewMessage}
            style={styles.input}
          />
          <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
            Enviar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6F4EA',
    },
    header: {
      backgroundColor: '#4CAF50',
    },
    chatContainer: {
      flex: 1,
    },
    messagesContainer: {
      padding: 10,
    },
    messageBubble: {
      maxWidth: '70%',
      borderRadius: 20,
      padding: 10,
      marginVertical: 5,
    },
    outgoing: {
      backgroundColor: '#C8E6C9',
      alignSelf: 'flex-end',
    },
    incoming: {
      backgroundColor: '#FFFFFF',
      alignSelf: 'flex-start',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#F1F8E9',
    },
    input: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#FFF',
    },
    sendButton: {
      backgroundColor: '#388E3C',
    },
  });