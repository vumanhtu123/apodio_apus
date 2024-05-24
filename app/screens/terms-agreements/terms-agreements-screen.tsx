import React, {FC, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {ScrollView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from '../../navigators';
import {Text} from '../../components/text/text';
import {Button} from '../../components/button/button';
import {styles} from './styles';
import {colors, scaleHeight, scaleWidth} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {translate} from '../../i18n';
import I18n from 'i18n-js';
import {Header} from '../../components/header/header';
import {Images} from '../../../assets/index';
// import { getAccessToken, setFirstOpenApp } from "../../utils/storage"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const TermsAgreementsScreen: FC<
  StackScreenProps<AppStackParamList, 'rules'>
> = observer(function TermsAgreementsScreen() {
  const navigation = useNavigation();
  const [readTerm, setreadTerm] = useState(false);
  const paddingBottom = useSafeAreaInsets().bottom;

  // const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  //   return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
  // }

  const termsAgreements = {
    tittle: I18n.t('termsAgreementsTitle'),
    tittle2: I18n.t('termsAgreementsTitle2') + '.',
    section: I18n.t('termsAgreementsSection1'),
    bodySection1: I18n.t('termsAgreementsBody1'),
    section2: I18n.t('termsAgreementsSection2'),
    bodySection2: I18n.t('termsAgreementsBody2'),
    section3: I18n.t('termsAgreementsSection3'),
    bodySection3: I18n.t('termsAgreementsBody3'),
    bodySection4: I18n.t('termsAgreementsBody4'),
    section4: I18n.t('termsAgreementsSection4'),
    bodySection5: I18n.t('termsAgreementsBody5'),
    bodySection6: I18n.t('termsAgreementsBody6'),
    section5: I18n.t('termsAgreementsSection5'),
    bodySection7: I18n.t('termsAgreementsBody7'),
    section6: I18n.t('termsAgreementsSection6'),
    bodySection8: I18n.t('termsAgreementsBody8'),
    section7: I18n.t('termsAgreementsSection7'),
    bodySection9: I18n.t('termsAgreementsBody9'),
    section8: I18n.t('termsAgreementsSection8'),
    bodySection10: I18n.t('termsAgreementsBody10'),
    end: I18n.t('termsAgreementsDate'),
    termsAgreementsTitle: 'TERMS AND CONDITIONS SUMMARY',
    termsAgreementsTitle2:
      'PLEASE READ THESE TERMS OF CONDITIONS FOR MOSAN (“T&C”) CAREFULLY BEFORE USING MOSAN.',
    termsAgreementsSection: '1. Definition',
    termsAgreementsContent:
      'Mosan is a money transfer service allowing customer to send and receive money in a faster, safer and more convenient way than traditional money transfer method, provided in Timor Leste through Telemor Fintech Unipesoal Lda. Mosan account is like a mobile “wallet” - a wallet operating on your mobile phone and is separated from your mobile account (used for telecom services). This mobile “wallet” allows you to keep your money, buy pulsa, send and receive money from others. You can also withdraw cash from your Mosan account in any of Telemor’s nationwide network of agents… Notably, transactions on Mosan could be conducted anytime and anywhere. All you need is your phone with Telemor connection. “AML/CFT” means anti-money laundering/combating the finance of terrorism.',
    termsAgreementsSection8: '8. Governing Law',
    termsAgreementsContent8:
      'These T&C shall be governed by and construed in accordance with the laws of Timor Leste, without regard to its conflict or choice of law provisions. Unless otherwise provided for in the governing law, any claim or dispute arising in connection with these T&C or Your use of MOSAN shall be resolved as set forth in the Service Terms and Conditions.  You will ensure that all responsible for the services subject to this terms, comply with all Anti-Money Laundering and counter Terrorist Financing Laws, regulations, standards or directives in force from time to time, including any guidelines, policies and procedures to that effect as may be issued by Telemor Fintech. Strictly follow and be responsible for the Law 17-2011-prevent and compat againt AML&CFT and Law No5.2013.III About AML&CFT from Banco central de Timor Leste.',

    Date: 'Effective Date: 01/05/2019',
  };

  return (
    <View style={styles.ROOT}>
      <Header
        style={{alignItems: 'center', height: 52}}
        //leftIcon={"ic_back"}
        onLeftPress={() => navigation.goBack()}
        // colorIcon={colors.text}
        titleStyle={{color: '#FFFFFF', fontFamily: '../../utils/'}}
        headerTx={'welcomeScreen.termsAgreements'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          // if (isCloseToBottom(nativeEvent)) {
          //   setreadTerm(true)
          // }
        }}
        style={{marginHorizontal: scaleWidth(12)}}>
        <Text
          style={[
            styles.tittle,
            {marginTop: scaleHeight(13), textAlign: 'center'},
          ]}
          text={termsAgreements.termsAgreementsTitle}
        />
        <Text
          style={[styles.tittle, {fontWeight: '400', textAlign: 'center'}]}
          text={termsAgreements.termsAgreementsTitle2}
        />
        <Text
          style={[styles.tittle, {marginTop: scaleHeight(15)}]}
          text={termsAgreements.termsAgreementsSection}
        />
        {/* <Text style={styles.content} text={termsAgreements.bodySection1} /> */}
        <Text
          style={[styles.tittle, {marginTop: scaleHeight(15)}]}
          text={termsAgreements.termsAgreementsContent}
        />

        <Text
          style={[styles.tittle, {marginTop: scaleHeight(15)}]}
          text={termsAgreements.termsAgreementsSection8}
        />
        {/* <Text style={styles.content} text={termsAgreements.bodySection1} /> */}
        <Text
          style={[styles.tittle, {marginTop: scaleHeight(15)}]}
          text={termsAgreements.termsAgreementsContent8}
        />
        <Text
          style={[styles.tittle, {marginTop: scaleHeight(15)}]}
          text={termsAgreements.Date}
        />

        {/* <Text style={styles.content} text={termsAgreements.bodySection2} />
          <Text
            style={[styles.tittle, { marginTop: scaleHeight(15) }]}
            text={termsAgreements.section3}
          />
          <Text style={[styles.tittle, { fontWeight: "400" }]}>
            <Text style={styles.tittle}>3.1 </Text>
            {termsAgreements.bodySection3}
          </Text>
          <Text style={[styles.tittle, { fontWeight: "400" }]}>
            <Text style={styles.tittle}>3.2 </Text>
            {termsAgreements.bodySection4}
          </Text>
          <Text style={[styles.tittle, { marginTop: scaleHeight(15) }]}>
            {termsAgreements.section4}
          </Text>
          <Text style={[styles.tittle, { fontWeight: "400" }]}>
            <Text style={styles.tittle}>4.1 </Text>
            {termsAgreements.bodySection5}
          </Text>
          <Text style={[styles.tittle, { fontWeight: "400" }]}>
            <Text style={styles.tittle}>4.2 </Text>
            {termsAgreements.bodySection6}
          </Text>
          <Text
            style={[styles.tittle, { marginTop: scaleHeight(15) }]}
            text={termsAgreements.section5}
          />
          <Text style={styles.content} text={termsAgreements.bodySection7} />
          <Text
            style={[styles.tittle, { marginTop: scaleHeight(15) }]}
            text={termsAgreements.section6}
          />
          <Text style={styles.content} text={termsAgreements.bodySection8} />
          <Text
            style={[styles.tittle, { marginTop: scaleHeight(15) }]}
            text={termsAgreements.section7}
          />
          <Text style={styles.content} text={termsAgreements.bodySection9} />
          <Text
            style={[styles.tittle, { marginTop: scaleHeight(15) }]}
            text={termsAgreements.section8}
          />
          <Text style={styles.content} text={termsAgreements.bodySection10} />
          <Text style={styles.sectionEnd} text={termsAgreements.end} /> */}
      </ScrollView>
      <Button
        onPress={() => {
          if (readTerm) {
            // setFirstOpenApp()
            // navigation.reset({index: 1, routes: [{ name: "login" as never }]})
          }
        }}
        style={readTerm ? styles.btnStartActive : styles.btnStart}
        textStyle={styles.textStart}
        tx="welcomeScreen.getStarted"
      />
      <View style={{marginBottom: paddingBottom}} />
    </View>
  );
});
