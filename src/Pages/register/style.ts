import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        flex: 1,
    },
    logo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: '-15%',
    },
    scrollView: {
        flex: 1,
      },
    form: {
        paddingHorizontal: 20,
        paddingTop: 0,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: 'green',
    },
    input: {
        marginBottom: 20,
        borderRadius: 50,
    },
    pillShape: {
        borderRadius: 50,
    },
    button: {
        width: 200,
        backgroundColor: 'green',
        borderRadius: 25,
        marginBottom: 20,
        marginHorizontal: 'auto',
    },
    buttonLabel: {
        color: 'white',
    },
    link: {
        color: 'green',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
})