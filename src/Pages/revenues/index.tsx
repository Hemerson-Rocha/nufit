// import { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, ImageBackground, Text } from 'react-native';
// import { Card, Paragraph, Button, Dialog, Portal, IconButton } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Header from './components/header';
// import BottomNav from '../../components/bottonNav';
// import { api } from '../../lib/axios';
// import { getUserId } from '../../functions/getUserId';

// type Recipe = {
//   id: string;
//   content: string;
// };

// export default function Revenues() {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
//   const [visible, setVisible] = useState(false);
//   const [selectedContent, setSelectedContent] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const take = 5;

//   useEffect(() => {
//     const fetchUserName = async () => {
//       try {
//         const id = await getUserId();
//         setUserId(id);
//       } catch (error) {
//         console.log('Erro ao buscar o nome do usuário:', error);
//       }
//     };
//     fetchUserName();
//   }, []);
  

//   const fetchRecipes = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const skip = (page - 1) * take;
//       const response = await api.get(`/receitas?take=${take}&skip=${skip}`);
//       const recipesData = Array.isArray(response.data.recipes) ? response.data.recipes : [];
//       setRecipes(recipesData);
//       setTotalPages(response.data.totalPages || 1);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Erro ao buscar dietas:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchFavoriteIds = async () => {
//     try {
//       console.log("userrrrrrid:", userId)
//       const response = await api.get(`/favoritos/ids/${userId}`);
//       setFavoriteIds(response.data.favoriteIds || []);
//     } catch (error) {
//       console.error("Erro ao buscar dietas favoritadas:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecipes();
//     fetchFavoriteIds();
//   }, []);

//   const showDialog = (content: string) => {
//     setSelectedContent(content);
//     setVisible(true);
//   };

//   const hideDialog = () => setVisible(false);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       fetchRecipes(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       fetchRecipes(currentPage - 1);
//     }
//   };

//   const saveRecipe = async (content: string) => {
//     try {
//       const response = await api.post("/receitas", { content, clientId: userId });
//       const recipeId = response.data.recipe.id;

//       await api.post("/favoritos", { recipeId, clientId: userId });

//       setFavoriteIds((prevFavoriteIds) => [...prevFavoriteIds, recipeId]);

//       console.log("Receita salva com sucesso!");
//     } catch (error) {
//       console.error("Erro ao salvar a receita:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground 
//         source={require('../../assets/background_home.png')} 
//         style={styles.backgroundImage} 
//       />
//       <Header />
      
//       <View style={styles.listContainer}>
//         <ScrollView>
//           {recipes.map((recipe, index) => {
//             const isFavorite = favoriteIds.includes(recipe.id);

//             return (
//               <Card key={index} style={styles.card}>
//                 <Card.Content>
//                   <Paragraph>{recipe.content.slice(0, 50)}...</Paragraph>
//                 </Card.Content>
//                 <Card.Actions>
//                   <Button onPress={() => showDialog(recipe.content)}>Ler Mais</Button>
//                   {!isFavorite && (
//                     <IconButton
//                       icon="bookmark"
//                       size={20}
//                       onPress={() => saveRecipe(recipe.content)}
//                     />
//                   )}
//                 </Card.Actions>
//               </Card>
//             );
//           })}
//         </ScrollView>
//       </View>

//       <View style={styles.paginationButtons}>
//         <Button
//           onPress={handlePreviousPage}
//           disabled={currentPage === 1 || isLoading}
//           contentStyle={styles.iconButton}
//           color="#2E8B57"
//         >
//           <Icon name="chevron-left" size={24} color="#2E8B57" />
//         </Button>

//         <View style={styles.pageNumbers}>
//           {Array.from({ length: totalPages }, (_, index) => {
//             const pageNum = index + 1;
//             return (
//               <Text
//                 key={pageNum}
//                 style={[
//                   styles.pageNumber,
//                   pageNum === currentPage && styles.currentPage
//                 ]}
//                 onPress={() => fetchRecipes(pageNum)}
//               >
//                 {pageNum}
//               </Text>
//             );
//           })}
//         </View>

//         <Button
//           onPress={handleNextPage}
//           disabled={currentPage === totalPages || isLoading}
//           contentStyle={styles.iconButton}
//           color="#2E8B57"
//         >
//           <Icon name="chevron-right" size={24} color="#2E8B57" />
//         </Button>
//       </View>

//       <Portal>
//         <Dialog visible={visible} onDismiss={hideDialog}>
//           <Dialog.Title>Dieta</Dialog.Title>
//           <Dialog.ScrollArea>
//             <ScrollView>
//               <Text>{selectedContent}</Text>
//             </ScrollView>
//           </Dialog.ScrollArea>
//           <Dialog.Actions>
//             <Button onPress={hideDialog}>Fechar</Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       <BottomNav />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     bottom: -180,
//     width: '100%',
//     height: '60%',
//   },
//   listContainer: {
//     flex: 3,
//   },
//   card: {
//     margin: 10,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   paginationButtons: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//   },
//   iconButton: {
//     justifyContent: 'center',
//   },
//   pageNumbers: {
//     flexDirection: 'row',
//   },
//   pageNumber: {
//     marginHorizontal: 4,
//     fontSize: 16,
//     color: '#000',
//   },
//   currentPage: {
//     fontWeight: 'bold',
//     color: '#2E8B57',
//   },
// });



import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card, Paragraph, Button, Dialog, Portal, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './components/header';
import BottomNav from '../../components/bottonNav';
import { api } from '../../lib/axios';
import { getUserId } from '../../functions/getUserId';

type Recipe = {
  id: string;
  content: string;
};

export default function Revenues() {
  const [userId, setUserId] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const take = 5;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (error) {
        console.log('Erro ao buscar o nome do usuário:', error);
      }
    };
    fetchUserName();
  }, []);
  
  useEffect(() => {
    if (userId) {
      fetchFavoriteIds();
    }
  }, [userId]);

  // const fetchRecipes = async (page = 1) => {
  //   setIsLoading(true);
  //   try {
  //     console.log("userrrrrrid1:", userId)
  //     const skip = (page - 1) * take;
  //     // const response = await api.get(`/receitas?take=${take}&skip=${skip}`);
  //     const response = await api.get(`/receitas?take=${take}&skip=${skip}&userId=${userId}`);
  //     const recipesData = Array.isArray(response.data.recipes) ? response.data.recipes : [];
  //     setRecipes(recipesData);
  //     setTotalPages(response.data.totalPages || 1);
  //     setCurrentPage(page);
  //   } catch (error) {
  //     console.error("Erro ao buscar receitas:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (userId) {
      fetchRecipes();
    }
  }, [userId]);
  
  const fetchRecipes = async (page = 1) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      console.log("userrrrrrid1:", userId);
      const skip = (page - 1) * take;
      const response = await api.get(`/receitas?take=${take}&skip=${skip}&userId=${userId}`);
      const recipesData = Array.isArray(response.data.recipes) ? response.data.recipes : [];
      setRecipes(recipesData);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchFavoriteIds = async () => {
    try {
      console.log("userrrrrrid2:", userId)
      const response = await api.get(`/favoritos/ids/${userId}`);
      setFavoriteIds(response.data.favoriteIds || []);
    } catch (error) {
      console.error("Erro ao buscar receitas favoritadas:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const showDialog = (content: string) => {
    setSelectedContent(content);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchRecipes(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchRecipes(currentPage - 1);
    }
  };

  // const saveRecipe = async (content: string) => {
  //   try {
  //     const response = await api.post("/receitas", { content, clientId: userId });
  //     const recipeId = response.data.recipe.id;

  //     await api.post("/favoritos", { recipeId, clientId: userId });

  //     setFavoriteIds((prevFavoriteIds) => [...prevFavoriteIds, recipeId]);

  //     console.log("Receita salva com sucesso!");
  //   } catch (error) {
  //     console.error("Erro ao salvar a receita:", error);
  //   }
  // };
  const saveRecipe = async (recipeId: string) => {
    try {
      // Salva diretamente na tabela de favoritos, sem duplicar na tabela de receitas
      await api.post("/favoritos", { recipeId, clientId: userId });
  
      // Atualiza o estado com o novo favorito
      setFavoriteIds((prevFavoriteIds) => [...prevFavoriteIds, recipeId]);
  
      console.log("Receita favoritada com sucesso!");
    } catch (error) {
      console.error("Erro ao favoritar a receita:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/background_home.png')} 
        style={styles.backgroundImage} 
      />
      <Header />
      
      <View style={styles.listContainer}>
        <ScrollView>
          {recipes.map((recipe, index) => {
            const isFavorite = favoriteIds.includes(recipe.id);

            return (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Paragraph>{recipe.content.slice(0, 50)}...</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => showDialog(recipe.content)}>Ler Mais</Button>
                  {!isFavorite && (
                    <IconButton
                      icon="bookmark"
                      size={20}
                      onPress={() => saveRecipe(recipe.id)}
                    />
                  )}
                </Card.Actions>
              </Card>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.paginationButtons}>
        <Button
          onPress={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
          contentStyle={styles.iconButton}
          color="#2E8B57"
        >
          <Icon name="chevron-left" size={24} color="#2E8B57" />
        </Button>

        <View style={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <Text
                key={pageNum}
                style={[
                  styles.pageNumber,
                  pageNum === currentPage && styles.currentPage
                ]}
                onPress={() => fetchRecipes(pageNum)}
              >
                {pageNum}
              </Text>
            );
          })}
        </View>

        <Button
          onPress={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
          contentStyle={styles.iconButton}
          color="#2E8B57"
        >
          <Icon name="chevron-right" size={24} color="#2E8B57" />
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Dieta</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <Text>{selectedContent}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: -180,
    width: '100%',
    height: '60%',
  },
  listContainer: {
    flex: 3,
  },
  card: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  paginationButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  iconButton: {
    justifyContent: 'center',
  },
  pageNumbers: {
    flexDirection: 'row',
  },
  pageNumber: {
    marginHorizontal: 4,
    fontSize: 16,
    color: '#000',
  },
  currentPage: {
    fontWeight: 'bold',
    color: '#2E8B57',
  },
});
