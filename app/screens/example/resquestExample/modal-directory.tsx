import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, FlatList, TextInput, Image } from 'react-native';
import { Images } from '../../../../assets/index';
import { fontSize, scaleHeight, scaleWidth } from '../../../../app/theme';

const { width, height } = Dimensions.get('screen');

interface CategoryModalProps {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
    onSelectCategory: (category: string) => void;
}

const CategoryModal = (props: CategoryModalProps) => {
    const { isVisible, onSelectCategory, setIsVisible } = props;
    const [searchText, setSearchText] = useState('');

    const categories = [
        { id: '1', name: 'Gạch lát sàn', img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUXFxcYFRgWFxYYGBcXFxcXFxUYFxcYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFysdHR0tLS0tKy0rLS0tLS0tLS0tLS0tLSstLS0rLS03Ny0tLS0tKy0tLS0tKy03LS03LS0rK//AABEIAMIBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EAEQQAAEDAgIGBwUFBwIGAwAAAAEAAhEDIQQxBRJBUWFxE4GRobHB8AYiIzLRFDNys/FCUmJzgrLhJJNTkqKj0uIVNGT/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEBAQADAAMBAQAAAAAAAAABEQISITEDQVFhIv/aAAwDAQACEQMRAD8AWa1EaxdpiUZrVlpRrEVrFdrURrUFGsRGsV2tRGtQKYVvv1PxD+xqXqN/0tT+Ufygn8Kz36n4h/Y1L1Gf6Wr/ACj+SEHQz5f6/wA5i09H4Vz/AHWgklz4A/EV3A6PdUc2LCXyTkPjU+03yXp6NRlBhbTidZ+s7aYe6OQUtxYFQwDMOA58OqbBsEbt54oWN0g45lK1q5c7WJ2evXFLPMnl69clzaWdUm/qEBs3cer/AArV7wBvC5V2NHD12KorTdnwj/PkoXE5bu9EG0DPaoKUevBAIUiTuG5Wc3Zv796OWqau1VAxTAQ3iZPVu70wRPJU6OYjJRQm04iIHV2ouojaq4QqgOqs/TbfhHmFovcd3rkkNMiaR5hNHnA1VKNCqZVAtScxyhEptGYV2hUqC9pnbCgsKlxC1aLfdHJYjKZ5ZfVb+GadUWtqi++yiwNzEF7E65iC9iqki1RHLVERRrUZrVcUSMwiNYtsqNaiNarhqu1qKq1qI1qs1qYw9AuIDRJO5AnhGe/U/E3+xqYp6M/0dZ7zqgUXQNp+ACOQW1o/BsovqF8OeHNjaB8NnaVi4zEE4SsTtou/JCzarQxeNu1rfdaDUgDd09NL0nF2sdms/fnrnYlK5Pu7yan51NM4Y57tZ/c4+upZB4S7ZvsuePJEeScgeHrtXdQxG31KAdJkXJVH7DtJgDnmeoA9iO+nEE39bPqpQo7Tn4TuQdp042K+qiBq6GqoC5qjt29FcNpVWskzGyAoqhp2gZK7WK1QqxsqKaq4RCIFSp4ZogL2bsz4cFm6Zno77xA9ZrWzyF/WazNPiKZ4EHmcgorz0KjqkIoyVC0ZRs7FUDaJN5AneuPbuNymWshUbRHregXZTdtOUR5yvUYSn8Nn4R4LBDNma91oqjRFKmXazjqNJEwBI4XKjUYxoFMUtCVX5MidrvdF+efUtyrpJrLU2NbyAntzWZidIO+bbnn5qaY89i6ZpvcxwhzTBC4vbUtKUXgOqUmOccyWgkxbPqXVfKJlYrKXBW+xNOyOSedoSszJs/hcPAwUu9zmEBwIJyDmkTyO1dcZlAOjDsPahPwThm0+K1KWIG0diew9Ru/tUVg4TAuffJozcch9TwWs2syk3VpZn5nbT9BwRtKvMNaD7pk2y2LLcMzvsOtYqgUqpdUqn+Nv9jVnYr/6lT+S78lqfwtn1YyDmj/tsSVVp+yVif8Aguj/AGQg665BNo6SP96mm8CDBt+0+T/UYS9ZplvN8Dj09PNaOCpQDNzrPPa4nzQcFOFANqO5qpF4jj9EAnMJPZ1BGbThWYxXIQCVoQw2HZbfU8kxCgA5oJE9SI2nAV2tXc8stv0VAHsv69fqpUsmCqASTwQBY07R/hVbS4/QooZwm/rrVvXJQUc3csjT7JpHfrN8brcjVAWRpsfCP72s3ZxQea6LdZEa1cdV4bY6+G/JTXMXGqdmSqJUFiqUxa6IKdr3Ko4RCCEL1OErRSpgZ6rfALytY7s16fRrPhMO9oO3cp01yI/eduzYlsURqOiLApkgk3sAgY1o6J8fun1dZi0jSxUABRZbcTv8FFth9ipP1mh28Ssv2hbZnN3gj6BrQHUnE6zTMHcbwPW1V9ogNVn9Xgu/TlzPbzzQmqQS7Qm6YsuTqmIgAHmlxRNjc2tt7gnX05hNUWe4OP1WVef0ez36v4x/Y1KYqnGErA7KLu6iF6IUnTW1dWdZuYkfdMWa7AufharHavSOY5kiQJ1Ay8l20cdqYEqlMkiNnSnsq0zHrem8C+pLhUDR7xgtdPVkrsw86pB21Pz6X1T1fBOmQAev16CWBeoIVadMid6NWYciI5rg3DZn9EAGm112pUy9SrPE2HNcYBwUFHdl/wBUWm0kXUqMy45jhtV87C179k/RBNYZDkuhtgBZRwFgBafRRWhUchDeEcNVajbXQL1DlYwLmPWSoHE3u0d8bE4GWvntQqzcgoAtpn16uktOsil1haocN6zNMtJpEneNiDy5sQc5sqPuR3JwhLltyfU8FUc1PQS9Zm+8c04wW8UOoy8b0CjuOXDKPU9q9TgnHoqYuTqt8BnGS82OGa9Toun8Fn4G+CzWuV20zMk8AB39aFjm/Df+EpxwS2OI6N/4T4KK8pqjcFxXLea6tMPqNBoFYGLl5B4jop+i77QCzP6vALlIDpmWuXvm0fKwgX22Kv7QCzf6vAL0dOXLz7QnGCyWaE20Lk6j022TeEb7oPOO1L0hYhNt+URx8VArhvvav4m/lsQ67Tq1SN5gWEnUbAndMK2HnpKv42/ltUGIa7pA2ZBGYcNjb3ATRmUgAKYG9/b01Enz7FtELPo0CadjlUcYtciqTnsstJjtYWQJ4yz2xnbqEpzoGnNoSuPadYdXXcrQY1IM3SGFa0awnd1XPPYswuMxBG2TkBkPAre0k2WdfkVl1m2UqwJjCbn9eCKGTwUbfhGeSLUUgGxl/BEZSgQusH+foiQqKgLjmyrwuwgpCHUZKMVwBAB1O89SQ0191l+0FqBZ+m2/CPMIPL1Qdi41u/OEZ9MZKNZCIEWoVanPamSFRzUCDgQSJ7rxsXrNGfdUx/A3wXmqsB193ryXo8EPh0zvaD3LNa5MVDsSOPsx5t8pTgZdLaTZ8N4/hPVbao08s+ZzKiM2oPUqLbm9tT0k8ODrEgk3yuINlbE6YNUta5oGeU7uJS9PDku1Qb8ZA6t6q7BOa9pMbfD/ACt+09DsCbaEuwJpoUUQOhN0njUFxKVLbIgYoL0qcuJkXjKJy2kZqOoQHEbYnu9dSX1Lzs2K1MFAPC1Yp2H7dTIZnpHCNwG8lPYeY2STeMrQLdiTHui5tM9Z4K7azhYHuCaL4352jl4p+FmOqEkE5iEwMYdwVlBMcPd6/IrMITeLxUsMC/PgUiyRG3fz5KWqvqbV0t3qzRC60KDrWq0LoC7CCsLjyQLCVeEKs+EA6TCfeOfDwXWuOREd6LqW+q5TCgqGG3BJ6Y+6PMeK0YSGmB8I8x4qjzBbtK6QrwuQoBEKjkYhL4hgMAzmiKObK9FgWE02j+FsnqXnmg9X1816fBN+Gz8I8FK1yGWmc7ndZB0gwdG+c9UpxzZulsayKb/wnnko1XkXMKiZazeotub1LsUHAmDamRsueY8FoV2/KefgFgUH/MP4FvvIhuc+9ttlGXUuv6Z/YVMJpqXphMsCw0Oxq0Kfy+t6UoBO0xYetqg4AqV6Y1TYeij7lTEfKfW1UKUqTSBIBIJKK3CsjLvK5gxDb7+1HJhIEq1EBwA2x4o32Ju8930VcV8zerxTSYM7HYSBYze88ik2i/UtbSPyXynyKzGGVmqsArAIVR8QOI8UZB1dC4FaEAzU3KBoETmiFqoLTtCg6WlRo3roM8Fayo4Qs7TR+GeYT73gfRZWmH+51juQYhCrCvC4QoA1HQEHUk6x6ky4IJsb9XWgoxvivQYS7G3sGi3GO9Yi3cAfhM4tB7lK1yu2d9kLHj4b/wAJ8EyGwl9IH4buIKi15ZmJpxZ7P+YKLMqaJJNjHAhxPG+sortTJ/XpXujWn9yNy18C8F9Tf7vZqCPArCZUJDy4kkjM3mStPQbpe/kPArv+nL9thgTLAgUwjArDR7DCxTVO4A2XWYzEkbAvF4j2hxAq1Giq4AVHgARYBxgZLn33OfrfHF6+Po37Q9bErU0gwy0TPVzXk8FpquY+K7/pPiFoYNpJ1g9wJzsz/wAeCzPz8rfxWNnD4sCxzm0bimaguOY4rMo4I62sH3gCSwGwmBaN57SmMVUqMAJfTuYuxwixP753LfnL8Z8aPivmb1eKaLli/aXm7i07oXXYx+wnsWvJMaGOMtvvHgVmFgMzPbCs/GmIcVTX3rNoAfmAGcjjHq6fS7IN7523/pCaCRagULwM11cI4qopUqHZuUoiRJPFWA2bNqI1ghQVcFV1IEXntPkVd5j15qOQALYy2X+izNKE6nCRPHNadWlNjMZ2MckjpZsU8s3C6DEVSFcoFasAiuOqDrQaUmSd+SrVrjeJ3K1KqI47fXNTTFa7ABN+sr0Wj2/Cp79VvgsFxynPnkt3BfI0EWDRZSryM8cT2pLFiWu5G58k46eSXxB+G7ke5RWJCiq4H1+qi2w9DT0C6PundcDxemMNoV7TLW6u+XM8pK1+kBzAQsRUAiI6rLd1MU+wuAJluR28Fne9+8e0pt2KtHn/AJWBW04xjiKrKlMAkBxaSwibHWbMdcLNq5p+q2YknOduxeFrPitU/mP/ALivZYXGMqe8xzX7tUg9sLPxHs/ScS4FzSSSbyJNzYrn+Tm9T06fj6nN9lMBVXo8BXCw2aHezJwd3JyhrNzBXmvHU/Tt5c39vU4esN6zPa6r7mHAOdcA/wC1WPkh4fEJD2oqyMOP/wBA/JrLfHXuMdT0fomMkri9IVA8gOgCIsNwO5M0mrOxv3jurwC9LgM3HVDm9yJhsXLw0uLs9pOwpNphEwnzyG7CDlu8EqxrUalzFgPUI7a8mx5pIMEAkblHVo2xPKBl1rKtLX3Z81ZpOteMrdf6JOlXvAy4pkcfJXUwemSQbDPNdLjEjf6hUpnZzVw2fXriqizBa6q7aiaq43ggA1oH0Sem2/DmdosnXkkx9fFKaZaBSPMIPOvcFi6YxYZrkkD3Kmqf4w06neAtkXvEX9FYWl6LXmoDNqVQ2MZNJE8JWOr69t8z2x6OGq1KIeatTWIBs6BcbmhZmksOw2l03zLjstOsd69Ho+q1tFtwIaO3VWFi8QC9sHN8eCl+NS+3rqWJaRne2ciO5eowLwRTY1zZI3gxDHOyBk/L3rBwgvGe+eS18bhS+lTFJoa8xBaejMBji73wJFgV0s9OUrzuG0rjcTTFSl0NNjn6gAl74DyxziDAAEE5laeI0TUpdG92JrVdfXa9jtVrPu3kENaJzaMyUL2KwzTg6csBOvUvcH7120LUx+jaRNIFti503d/w371zuTHTd1gl/Fw6j9FFsf8Aw2H49qi65HPXoWu4pTSRMC+07FbW4lKaUNm8z4BavxFBWPqfqrFzXbfXGUk153K/S8CsKBjNDUX+9qtDv3me47nrNSpweJp/dV9cfu1Yd/1iHLQFcDMkHqHjCuK0n/181myNS0g3S1Vn31Bw/ipnXHZmE5h9K0n/ACvE7jYzugoxIm8dhBS+IwDHZsB4zl5p7X/kY05Mm3cuVsO15brSdV2s2/7UET2FyS+xFo+G5wG4mR3q7cXVb87A7iM1ny/sXx/la7FmY0/Ed1eARqOkWHORzWTpXHUxUOs8CYOckiIsBeLeK15S/Kz43+GGuLsjsT+jaPvC9/oOC8472ipNs3WcdkCB3wVuezmLNSXFrmkGBrbQRnkFPKVfGz22auGeYgAjbmhGi4GC0zv2R5rRpGUwwNVw1jYR1o43n6bE2M/LPrzWoKLDsBVxhGZwmJpE57+U+SLTZIkps4QbDCqaBG2epaZBDY4qr4AVtVw+YQqwEA6bQRlCR01TApk53C0lm6cf8M5WIm+Q4oPN1TGYnafID1sWFi3zUqcaNf8AtK3XvByzPgNqxX4CqXl+o6DSqNAi8ltrZ/quXfx14+vLUnOn5rSDECLGwK40Bny247e1b+C9l6zr1Ipj/md2TA7VvYH2doU76pc4ftPueoZDqCmW/XS9cz4awuEMTMd/+Fr4WqQabdg1udqVRI6kZOhXw5d0jJII9/L+VUW+r6cZPbzWh/aNlDCMp21g6o4gixGu92rO82Eic0XRftU7EYhjHMa1o13CJn5HCDfiV4DEVIceZ8Vr+zeHqsqiqWkAAwDmZETGxYm3P8dOpJv+vpn2kcfXWosIYt25RddccekaPRSml6sBmWZ8AufbqY/bB4Az4JHSeNY/VjWEE3MxddL8ZcZiSbAfRNU3nakaROy4Rg4rCnQ5WgbpSeu7crNq8HDvSrDLhuMK4qkZieSXpvnf2FGa7cY5rKjNrNiSummw3gnt81QA7IUDozt3d6qKVdH0zfIpOv7PUnu1iNYgRcmIHCeK1GVHDMTxt5K/SjPVPZ5qeMXyrOoaKaywawcgE3RZGX6I4qNIvI5orXA2Dr96uJrjHRvlHFU2uR1T4qrWHa6epGamGrtdx7QitqdfI/RL9vUoHHYD3IHBU6uZI70VlU71mCoT+l+yVYA7Ce8eCaNXpfUqhaP1ukabKm10d5TTbbZ5qo6+iCIi3NK4rRrXNImJjJNay456YMZuhgz5T4T4KDDEfs7/AFmtN5CFAUxdZTmnd4oLydkLUfTCXqYZu4JhrNeDGXfKpTbDgYMidm9rm59a0DhwNg7FTobqWLK8RgvZljHa7iXukmS2AOQ81rU8IBl3hbH2dAr0jkDHZ5ph5aRLOSiL9nO/uCiuIxDntPWPNMMpGL60HbsXoqGGY3Jo7L9qW02bM5nwC3jLOaOvrR2GNpHP/KVa9X6bNQPCp1rrax3JNjiBmPJdFcxmPNQaTSdytB3pOjUyvEpoOTF10g7uwx5rrnnblxKgcrB6YIyo4CzSOVx4BFGKv8wncYBXGkLuo05gdgTARmJdOU9n1Rm1ZzZ2x5JdjALBrQOFuyFem12wnkb96ntRukbtAHX6lE1SflNtx8iEIgZkd0ojag3W4IDicr9UfVQOOxyjdUiLEdqu2FcRATG/shWbVEbuGSr2eHehODh8scpnxCBjpiM57vIojKs/okHtd+gCWJIzJO8ye0/opqtnpEN1VZorg5E9RB8VcVJsYnl9FdQ2aiGaiWc+OA4EeBQnVnbIPP6CU0NdIql6WDrTlyshurxtnx7k0MOqjeFGuuEqa3DvjxVS8DZHGPogOShOKV6acnT1jzXDW/i7vMIDQupQ1T6B+i6geas/TmTOZ8AooulZZD8ir0BZRRZUQD3uzxRWfOOR8lFFB2uYytdN7F1RRRKRUqZqKJQdqsFFFUGaiNUURRSh4v5Z22vtUUUoHibZWy8U9SNhyCiikVdRRRaRFwqKIFqqFUyUUWFKty61J8AoogrUOaTbUM5ntUUVD4FupVawTkFxRKjPDBLrBXBXFFFF1RuUUUWkf//Z'},
        { id: '2', name: 'Gạch ốp tường', img: 'https://bighousevietnam.com/wp-content/uploads/2021/07/gach-lat-nen-dep.jpg'},

        // Thêm các danh mục khác vào đây
    ];

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const renderCategoryItem = ({ item }: any) => (

        <TouchableOpacity
            onPress={() => {
                onSelectCategory(item.name);
                setIsVisible(false);
            }}
            style={[styles.categoryItem]}
        >
            <View>
                <Image source={{uri:item.img}} width={50} height={50} style={{borderRadius:10}} />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Danh mục</Text>
                          
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <Images.ic_X />
                            </TouchableOpacity>
                            
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm tên danh mục"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <FlatList
                                data={filteredCategories}
                                renderItem={renderCategoryItem}
                                keyExtractor={item => item.id}
                                // key={`${filteredCategories.length}-${3}`}
                                numColumns={3}
                                columnWrapperStyle={styles.columnWrapper}
                                // style = {{backgroundColor: 'red'}}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: width,
        maxHeight: height - 100,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E7EFFF',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalClose: {
        fontSize: 14,
        color: '#FF0000',
    },
    modalBody: {
        padding: scaleHeight(32),
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#E7EFFF',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        backgroundColor:"#F5F5F5"
    },
    categoryItem: {
     
        alignItems: 'center',
        width: scaleWidth(100),
        height: scaleHeight(67),
        // backgroundColor : 'red',
        marginRight : 11
    },
    columnWrapper: {
        // justifyContent: 'space-between',
    },
    separator: {
        height: 1,
        backgroundColor: '#E7EFFF',
    },
    titleView: {
        alignItems: "center",

    },
    title: {
        color: '#242426',
        fontSize: fontSize.size12,
        fontWeight: '400',
    },
});

export default CategoryModal;