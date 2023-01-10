import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // 6.2.2

export default class Card extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		
		let CardSource = FontAwesome;
		let icon_name = 'question-circle';
		let icon_color = '#393939';
		
		if(this.props.is_open){
			CardSource = this.props.src;
			icon_name = this.props.name;
			icon_color = this.props.color;
		}
		
		return (
			<View style={styles.card}>
				<TouchableHighlight onPress={this.props.clickCard} activeOpacity={0.75} underlayColor={"#f1f1f1"}>
					<CardSource 
						name={icon_name} 
						size={50} 
						color={icon_color} 
					/>
				</TouchableHighlight>		
			</View>
		);
	}

	

}


const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	},
	card_text: {
		fontSize: 50,
		fontWeight: 'bold'
	}
});
