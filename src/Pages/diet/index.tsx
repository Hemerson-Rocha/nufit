import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Button, Dialog, Portal, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../lib/axios';
import BottomNav from '../../components/bottonNav';
import { getUserId } from '../../functions/getUserId';

type Recipe = {
  id: string;
  content: string;
};

export default function Diet() {
  const [userId, setUserId] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
  

  const fetchRecipes = async (page = 1) => {
    setIsLoading(true);
    try {
      const skip = (page - 1) * take;
      const response = await api.get(`favoritos/${userId}`);
      const favoritesData = Array.isArray(response.data.favorites) ? response.data.favorites : [];

      const recipesData = favoritesData.map(favorite => ({
        id: favorite.recipe.id,
        content: favorite.recipe.content,
      }));
  
      setRecipes(recipesData);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao buscar dietas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  useEffect(() => {
    if (userId) {
      fetchRecipes();
    }
  }, [userId]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Página {currentPage} de {totalPages}</Text>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.listContent}>
          {recipes.map((recipe) => (
            <Card key={recipe.id} style={styles.card}>
              <Card.Content>
                <Text>{recipe.content.slice(0, 50)}...</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined"
                color="#2E8B57"
                style={styles.readMoreButton}
                onPress={() => showDialog(recipe.content)}>Ler Mais</Button>
              </Card.Actions>
            </Card>
          ))}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flex: 3,
    backgroundColor: 'rgba(46, 139, 87, 0.7)'
  },
  listContent: {
  },
  card: {
    margin: 10,
    borderRadius: 8,
  },
  paginationButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#2E8B57',
    fontWeight: 'bold',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  readMoreButton: {
    borderColor: '#2E8B57',
    borderWidth: 1,
  },
  pageText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});


// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Card, Button, Dialog, Portal, Text } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { api } from '../../lib/axios';
// import BottomNav from '../../components/bottonNav';
// import { getUserId } from '../../functions/getUserId';

// type Recipe = {
//   id: string;
//   content: string;
// };

// export default function Diet() {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [visible, setVisible] = useState(false);
//   const [selectedContent, setSelectedContent] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [noFavoritesMessage, setNoFavoritesMessage] = useState(false);
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
//     setNoFavoritesMessage(false);
//     try {
//       const skip = (page - 1) * take;
//       const response = await api.get(`favoritos/${userId}`);
//       const favoritesData = Array.isArray(response.data.favorites) ? response.data.favorites : [];

//       const recipesData = favoritesData.map(favorite => ({
//         id: favorite.recipe.id,
//         content: favorite.recipe.content,
//       }));
  
//       setRecipes(recipesData);
//       setTotalPages(response.data.totalPages || 1);
//       setCurrentPage(page);
//     } catch (error) {
//       if (error.response?.status === 404 && error.response?.data?.message === "Nenhum favorito encontrado para este usuário.") {
//         setNoFavoritesMessage(true);
//       } else {
//         console.error("Erro ao buscar dietas:", error);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchRecipes();
//     }
//   }, [userId]);

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

//   return (
//     <View style={styles.container}>
//       <Text style={styles.pageText}>Página {currentPage} de {totalPages}</Text>

//       <View style={styles.listContainer}>
//         <ScrollView contentContainerStyle={styles.listContent}>
//           {noFavoritesMessage ? (
//             <Text style={styles.noFavoritesText}>Não há dietas favoritadas</Text>
//           ) : (
//             recipes.map((recipe) => (
//               <Card key={recipe.id} style={styles.card}>
//                 <Card.Content>
//                   <Text>{recipe.content.slice(0, 50)}...</Text>
//                 </Card.Content>
//                 <Card.Actions>
//                   <Button mode="outlined"
//                     color="#2E8B57"
//                     style={styles.readMoreButton}
//                     onPress={() => showDialog(recipe.content)}>Ler Mais</Button>
//                 </Card.Actions>
//               </Card>
//             ))
//           )}
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
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   listContainer: {
//     flex: 3,
//     backgroundColor: 'rgba(46, 139, 87, 0.7)',
//   },
//   listContent: {},
//   card: {
//     margin: 10,
//     borderRadius: 8,
//   },
//   paginationButtons: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
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
//     color: '#2E8B57',
//     fontWeight: 'bold',
//   },
//   iconButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   readMoreButton: {
//     borderColor: '#2E8B57',
//     borderWidth: 1,
//   },
//   pageText: {
//     textAlign: 'center',
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   noFavoritesText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#2E8B57',
//     marginTop: 20,
//   },
// });
