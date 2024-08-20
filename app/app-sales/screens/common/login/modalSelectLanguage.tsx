import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReactNativeModal from 'react-native-modal';
import { Row } from '../../../../components/Row';
import { Text } from '../../../../components';
import { Svgs } from '../../../../../assets/svgs';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { colors } from '../../../theme';
import { getCurrentLanguage, setCurrentLanguage } from '../../../utils/storage';

interface Language {
    id: string;
    name: string;
    icon: React.JSX.Element;
}

interface Props {
    isVisible: boolean,
    setIsVisible: () => void,
    onSelectLanguage: (language: Language) => void,
    arrLanguage: { id: string, name: string, icon: React.JSX.Element }[]
}

const ModalSelectLanguage = (props: Props) => {


    const [selectLanguage, setSelectLanguage] = useState('');




    const select = (language: any) => {
        // console.log('====================================');
        // console.log("data chon", language);
        // console.log('====================================');
        props.onSelectLanguage(language);
        props.setIsVisible();
    };

    const getValueLanguage = async () => {
        const value = await getCurrentLanguage()
        console.log('vaaaaaaaaaa', value);
        setSelectLanguage(value)
    }

    useEffect(() => {
        getValueLanguage()
    }, [])

    return (
        <ReactNativeModal
            statusBarTranslucent
            backdropOpacity={0.5}
            animationIn={"zoomIn"}
            animationOut={"fadeOut"}
            onBackdropPress={() => {
                props.setIsVisible()
            }}
            isVisible={props.isVisible}
            style={{
                justifyContent: "flex-end",
                alignItems: "center",
                margin: 0
            }}
        >
            <View style={styles.viewModal}>
                <View style={styles.viewLineModal} />
                <Row justify="space-between">
                    <Text
                        tx={props.isVisible ? "inforMerchant.setLanguage" : "selectMethod"}
                        // tx="Hủy"

                        style={styles.textMethod}
                    />
                </Row>
                {
                    props.arrLanguage?.map((Language, index) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: "100%",

                                }}
                                onPress={async () => {
                                    console.log('====================================');
                                    console.log('value doan', Language.id);
                                    console.log('====================================');
                                    select(Language)
                                    setSelectLanguage(Language.id);
                                    await setCurrentLanguage(Language.id)
                                }}>
                                <View
                                    style={{ width: "100%", height: 1, backgroundColor: colors.solitude2 }}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ padding: 8 }}>
                                            {Language.icon}
                                        </View>
                                        <Text>{Language.name} </Text>
                                    </View>
                                    {selectLanguage == Language.id ? <Svgs.ic_tick /> : null}
                                </View>

                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ReactNativeModal>
    )
}

export default ModalSelectLanguage