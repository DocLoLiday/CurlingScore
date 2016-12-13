/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Animated,
    AppRegistry,
    Dimensions,
    PanResponder,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class CurlingScore extends Component {
    constructor(props){
        super(props);

        this.state = {
            pan     : new Animated.ValueXY()   //Step 1
        };

        this.panResponder = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0,y:0}}
                ).start();
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                    {this.renderEndCard()}
                <View style={styles.full}>
                    <View style={styles.scoreCardColumn}>
                        <View style={styles.topRow}>
                            <View style={styles.scoreView}>
                            </View>
                        </View>
                        <View style={styles.midRow}>
                        </View>
                        <View style={styles.botRow}>
                            <View style={styles.scoreView}>
                            </View>
                        </View>
                    </View>

                    <ScrollView
                        style={styles.scrollRow}
                        horizontal={true}>
                            <View style={styles.column}>
                                <View style={styles.topRow}>
                                    {this.renderTeamRow("team1")}
                                </View>
                                <View style={styles.midRow}>
                                    {this.renderScoreRow()}
                                </View>
                                <View style={styles.botRow}>
                                    {this.renderTeamRow("team2")}
                                </View>
                            </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderEndCard () {
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[this.state.pan.getLayout(), styles.endCard]}>
                <Text style={styles.text}>8</Text>
            </Animated.View>
        );
    }

    renderScoreRow () {
        var scoreRow = [];
        for (var i = 0; i < 20; i++) {
            scoreRow.push(
                <View key={"score-" +i} style={styles.scoreView}>
                    <Text style={styles.text}>{i + 1}</Text>
                </View>
            );
        }
        return scoreRow;
    }

    renderTeamRow (team) {
        var teamRow = [];
        for (var i = 0; i < 20; i++) {
            teamRow.push(
                <View key={team + "-" +i} style={styles.scoreView}>
                </View>
            );
        }
        return teamRow;
    }
}
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    topRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    midRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
      },
    botRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'yellow'
    },
    scrollRow: {
    },
    scoreCardColumn: {
        flexDirection: 'column',
    },
    endCard: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#1a1a1a',
        backgroundColor: 'green',
        width: 50,
        height: 75,
        margin: 5,
        position: 'absolute',
        top: 0,
        left: 0
    },
    scoreView: {
        flex: 1,
        width: 60,
        borderWidth: 1,
        borderColor: '#1a1a1a',
        flexDirection: 'column',
        alignItems: 'center'
    },
    full: {
        flex: 1,
    }
});

AppRegistry.registerComponent('CurlingScore', () => CurlingScore);
