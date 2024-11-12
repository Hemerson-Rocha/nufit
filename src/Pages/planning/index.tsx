import { useState } from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, Button, Modal, Portal } from 'react-native-paper';
import Header from './components/header';
import BottomNav from '../../components/bottonNav';

interface Meal {
  id: string;
  title: string;
  description: string;
}

const meals: Meal[] = [
  { id: '1', title: 'Café da Manhã', description: 'Frutas, aveia e iogurte.' },
  { id: '2', title: 'Lanche da Manhã', description: 'Banana e amendoim.' },
  { id: '3', title: 'Almoço', description: 'Arroz, feijão, salada e frango.' },
  { id: '4', title: 'Lanche da Tarde', description: 'Suco verde e torradas.' },
  { id: '5', title: 'Jantar', description: 'Sopa de legumes e chá.' },
];

export default function Planning() {
  const [visible, setVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const showModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background_home.png')}
        style={styles.backgroundImage}
      />
      <Header />
      <View style={styles.carouselContainer}>
        <FlatList
          data={meals}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Button mode="text" onPress={() => showModal(item)}>
                  Ver mais
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          {selectedMeal && (
            <>
              <Title>{selectedMeal.title}</Title>
              <Paragraph>{selectedMeal.description}</Paragraph>
              <Button onPress={hideModal}>Fechar</Button>
            </>
          )}
        </Modal>
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
  carouselContainer: {
    height: 150,
    paddingVertical: 10,
  },
  card: {
    marginRight: 10,
    width: 200,
    height: 130,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
  chatWrapper: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    height: 320,
  },
  message: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});
