import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableHighlight,  ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin  extends Component {
    _autenticarUsuario() {
        const {email, senha} = this.props;
        this.props.autenticarUsuario({email, senha});
    }
    renderBtnAcessar() {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size='large'/>
            );    
        }
        return (
            <Button color='#115E54' title="Acessar" onPress={() => this._autenticarUsuario()}/>
        );
    }
    render() {
        return (
            <Image style={{flex: 1, width: null}} source={require('../imgs/bg.png')}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25, backgroundColor: 'transparent', color: '#fff'}}>WhatsApp Clone</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput value={this.props.email} style={{fontSize: 20, height: 45 }} placeholderTextColor='#fff' placeholder='E-mail' onChangeText={texto => this.props.modificaEmail(texto)}/>
                        <TextInput secureTextEntry value={this.props.senha} style={{fontSize: 20, height: 45}} placeholderTextColor='#fff' placeholder='Senha'  onChangeText={texto => this.props.modificaSenha(texto)}/>
                        <Text style={ { backgroundColor: 'transparent', color: '#ff0000', fontSize: 18} }> {this.props.erroLogin}</Text>
                        <TouchableHighlight onPress={() => Actions.formCadastro() }>
                            <Text style={{fontSize: 20, color: '#fff'}}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 2}}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </Image>
        ); 
    }
  }

const mapStateToProps = state => (
    {
        email: state.AuthenticacaoReducer.email,
        senha: state.AuthenticacaoReducer.senha,
        erroLogin: state.AuthenticacaoReducer.erroLogin,
        loading_login: state.AuthenticacaoReducer.loading_login
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);