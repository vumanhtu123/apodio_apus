import { createClient } from "reactotron-core-client";

const en = {
  common: {
    ok: "OK",
    cancel: "Hủy",
    back: "Back",
    confirm: "Xác nhận",
    logOut: "Log Out",
    listCompany: "Danh sách công ty",
    filter: " Bộ lọc",
    saveChange: "Lưu thay đổi",
    edit: "Sửa",

    continue: "Tiếp tục",
    saveAndContinue: "Lưu và tiếp tục",
    // @demo remove-current-line
  },
  txtToats: {
    please_select_attribute: "Vui lòng chọn thuộc tính",
    required_information: "Vui lòng nhập đủ thông tin bắt buộc",
    required_maximum_number_of_photos: "Số lượng ảnh tối đa là 6",
    required_value_null: "Không thể thêm giá trị rỗng",
    an_error_occurred: "Đã có lỗi xảy ra, xin vui lòng thử lại!",
    required_dvt: "Vui lòng chọn đơn vị tính",
    permission_granted: "Quyền truy cập đã được cho phép",
    permission_denied: "Quyền truy cập bị từ chối",
    permission_blocked: "Quyền truy cập bị chặn, cần kích hoạt ở cài đặt",
    attribute_is_using: "Thuộc tính đang được sử dụng, không thể xóa",
    cannot_be_deselected: "Không thể bỏ chọn thuộc tính này",
    cannot_create_duplicate: "Không thể tạo giá trị trùng",
    product_is_using:
      "Sản phẩm đã được sử dụng, bạn không được phép thay đổi thông tin này",
    create_success : 'Tạo hoá đơn thành công',
    noClient: 'Vui lòng chọn khách hàng',
    change_city: "Vui lòng chọn Tỉnh/Thành phố",
    change_district: "Vui lòng chọn Quận/Huyện",
  },
  txtDialog: {
    txt_title_dialog: "Thông báo",
    content_exit_dialog: "Bạn có chắc chắn muốn thoát?",
    settings: "Settings",
    delete_variant: "Bạn có muốn xóa biến thể này?",
    permission_allow: "Permission allow",
    allow_permission_in_setting: "Allow permission in setting",
    save_the_conversion_group: "Bạn có muốn lưu nhóm quy đổi",
    save_unit: "Bạn có muốn lưu đơn vị tính",
    adding_a_new_price_range:
      "Bạn cần nhập đủ thông tin trước khi thêm khoảng giá mới",
    product_repair_successful: "Sửa sản phẩm thành công!",
    product_delete_successful: "Xóa sản phẩm thành công!",
    imageUploadExceedLimitedSize: "The image upload are exceed limited size",
    attribute_deletion_warning:
      "Hành động này sẽ khiến các phân loại sản phẩm cũ bị xóa đi hoặc thay đổi. Bạn có chắc chắn muốn thực hiện?",
    confirm_edit_attribute:
      "Bạn có chắc chắn muốn thoát. Hành động này sẽ xóa dữ liệu bạn đã chọn?",
    delete_order: "Bạn có chắc chắn muốn hủy đơn hàng bán ",
    delete_order1: "này không?",
    createClientSuccessful: "Thêm khách hàng thành công",
    createClientFail: "Thêm khách hàng thất bại công",
    ok: "Ok",
    notification: "Thông báo",
  },
  ruleController: {
    emptyText: "Vui lòng nhập dữ liệu",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
    next: "Next",
    getStarted: "Get Start",
    termsAgreements: "Điều Khoản Và Thỏa Thuận",
    termsAgreementsTitle: "TERMS AND CONDITIONS SUMMARY",
    termsAgreementsTitle2:
      "PLEASE READ THESE TERMS OF CONDITIONS FOR MOSAN (“T&C”) CAREFULLY BEFORE USING MOSAN.",
    section: "1. Definition",
    content:
      "Mosan is a money transfer service allowing customer to send and receive money in a faster, safer and more convenient way than traditional money transfer method, provided in Timor Leste through Telemor Fintech Unipesoal Lda. Mosan account is like a mobile “wallet” - a wallet operating on your mobile phone and is separated from your mobile account (used for telecom services). This mobile “wallet” allows you to keep your money, buy pulsa, send and receive money from others. You can also withdraw cash from your Mosan account in any of Telemor’s nationwide network of agents… Notably, transactions on Mosan could be conducted anytime and anywhere. All you need is your phone with Telemor connection. “AML/CFT” means anti-money laundering/combating the finance of terrorism.",

    introScreenContent1:
      "Easy to use, high security, support multiple platforms. Payment, transfer money anytime, anywhere !",
    introScreenSubTitle1: "Super utility",
    introScreenContent2:
      "Easy to pay Electricity Bill, Phone Top-up and Banking services",
    introScreenSubTitle2: "Easy and safe",
    introScreenContent3: "Get unlimited Promotions and Discounts from Mosan!",
    introScreenSubTitle3: "Super promotions",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content:
        "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    userName: "userName",
    signIn: "Đăng nhập",
    forgotPasswordForMerchant: "Forgot Password For Merchant",
    forgotPasswordForStaff: "Forgot Password For Staff",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Tài khoản",
    passwordFieldLabel: "Mật khẩu",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
    forgotPasswordMerchant: "forgot password Merchant",
    forgotPassword: "Quên mật khẩu",
    vietNam: "VietNamese",
    english: "English",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  forgotPass: {
    phoneOrEmail: "Số điện thoại hoặc email",
    passwordNew: "Nhập mật khẩu",
    passwordConfirm: "Nhập lại mật khẩu",
    continue: "Tiếp tục",
  },
  dialog: {
    title: "Mã xác thực",
    content: "Vui lòng nhập OTP được gửi tới số điện thoại của bạn",
  },
  changePass: {
    changePass: "Change Pass",
    importOldPass: "Enter old password",
    next: "Next",
  },
  dashboard: {
    storeInformation: "Store information",
    promotions: "Chiết khấu",
    transactionHistory: "Transaction history",
    sampleRequest: "Sample request",
    orders: "Đơn hàng",
    product: "Product",
    moreFeatures: "More features",
    supply: "Supply",
    debt: "Công nợ",
    revenue: "Revenue",
    revenueMonth: "Revenue this month",
    titleBanner: "Participating sales programs",
    titleOrder: "Orders being processed",
    start: "Start: ",
    end: "End: ",
    goods: "Tiền hàng: ",
    promotionsInvoice: "Promotions:",
    totalAmount: "Tổng thanh toán:",
    estimated: "Trọng tải đơn hàng dự tính:",
    orderNCC: "Order NCC",
    orderApodio: "Order Apodio",
    request: "Sample issuance request",
    amountProduct: "Số lượng sản phẩm",
    client: "Khách hàng",
    totalTax: "Tổng thuế:",
  },
  order: {
    orderTracking: "Theo dõi hành trình đơn hàng",
    time: "Thời gian",
    back: "Quay lại",
    select_father_status: "Chọn trạng thái cha",
    select_child_status: "Chọn trạng thái con",
    father_status: "Trạng thái cha",
    child_status: "Trạng thái con",
    shipping_status: "Trạng thái vận chuyển",
    update_shipping_status: "Cập nhật trạng thái vận chuyển",
    update_status: "Cập nhật trạng thái",
    copy: "Sao chép",
    return: "Huỷ đơn",
    printInvoice: "In hoá đơn",
    showInvoiceDetail: "Xem chi tiết hóa đơn",
    arrange: "Sắp xếp",
    searchCodeName: "Tìm kiếm theo mã và tên",
    orderDetail: "Chi tiết đơn hàng",
    sendInvoice: "Tạo hóa đơn",
    quantity: "SL: ",
    promotions: "Chiết khấu:",
    totalAmountNoTax: "Tổng tiền(chưa thuế):",
    tax: "Tổng thuế:",
    totalAmount: "Tổng thanh toán:",
    estimated: "Trọng tải đơn hàng dự tính:",
    date: "Date",
    money: "Money",
    cash: "Cash",
    editOrder: "Sửa đơn hàng",
    newAddressDialog: "Thêm địa chỉ mới thành công",
    editAddressDialog: "Sửa địa chỉ thành công",
    addProduct: "Chọn sản phẩm",
    editDelivery: "Sửa địa chỉ giao hàng",
    newDelivery: "Thêm địa chỉ giao hàng",
    addToCart: "Thêm vào giỏ hàng",
    seeDetail: "Xem chi tiết",
    price2: "Giá bán: ",
    miniumQuanlity: "SL tối thiểu cần bán: ",
    quanlity: "Số lượng:",
    confirm: "Tạo đơn hàng",
    select: "Chọn",
    choose_customer: "Chọn khách hàng",
    price_list: "Bảng giá áp dụng",
    no_price_list: "Không áp dụng bảng giá",
    address_order: "Địa chỉ giao hàng",
    no_address_order: "Chọn địa chỉ giao hàng",
    info_more: "Thông tin thêm",
    selectTaxes: "Chọn loại thuế",
    taxes: "Loại thuế",
    taxes_apply: "Thuế áp dụng",
    payment_method: "Phương thức thanh toán",
    advance_payment_method: "Phương thức thanh toán trước",
    apply: "Áp dụng",
    cancel: "Hủy",
    available_limit: "(Hạn mức khả dụng: ",
    COD: "COD",
    bank: "Ngân hàng",
    debt: "Công nợ",
    sum: "Tổng cộng",
    amount_paid: "Số tiền còn lại cần phải trả: ",
    warning_payment: "Thanh toán trước",
    text_money_limit: "Số tiền tối thiểu cần thanh toán trước:",
    tittle_warning:
      " Vui lòng chọn một phương thức thanh toán trước để kết hợp với hạn mức công nợ khả dụng",
    customer_paid: "Khách đã trả",
    method_payment: "Phương thức thanh toán",
    money_face: "Tiền mặt",
    taxes_vat: "Thuế VAT ",
    select_texas: "Chọn thuế",
    add_texas: "Thêm chiết khấu",
    sum_texas: "Thành tiền",
    method_pay: "Phương thức thanh toán",
    later_order: "Sau khi nhận hàng",
    input_texas: "Nhập chiết khấu",
    input_price: "Nhập giá",
    sum_no_texas: "Tổng tiền (chưa thuế):",
    sum_yes_texas: "Tổng tiền (gồm thuế)",
    DOMESTICALLY: "Trong nước",
    EXPORTED: "Xuất khẩu",
    CASH: "Tiền mặt",
    BANK_TRANSFER: "Chuyển khoản ngân hàng",
    BANK: "Ngân hàng",
    CREDIT: "Tín dụng",
    DEDUCTION_OF_LIABILITIES: "Công nợ",
    EXCEPT_FOR_LIABILITIES: "Đối trừ công nợ",
    cancellationReason: "Cancellation reason",
    sellerConfirm: "Thông tin thanh toán",
    deliveryAddress: "Địa chỉ giao hàng",
    receiptAddress: "Đại chỉ nhận hàng",
    invoiceAddress: "Địa chỉ hóa đơn",
    otherAddress: "Địa chỉ khác",
    personalAddress: "Địa chỉ cá nhân",
    contact: "Địa chỉ liên hệ",
    discount: "Chiết khấu: ",
    changeDeliveryAddress: "Chọn địa chỉ giao hàng",
    staff: "Staff: ",
    paymentMethods: "Loại chứng từ",
    selectPayment: "Chọn loại chứng từ",
    requestCancellation: "Request cancellation",
    payer: "Payer",
    timePay: "Payment date and time",
    paymentAmount: "Payment amount",
    cancelOrder: "Cancel order",
    reasonForCancellation: "Reason for cancellation",
    textOrderCancel:
      "Are you sure you want to cancel this order? After agreeing to your cancellation request, your order will be sent to the seller for confirmation!",
    reason: "Reason",
    placeholderReason: "Enter reason for cancellation",
    addAddress: "Thêm địa chỉ mới",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    deFault: "Mặc định",
    addressDefault: "Đặt làm địa chỉ mặc định",
    district: "Quận/Huyện",
    city: "Tỉnh/Thành phố",
    ward: "Phường/Xã",
    chooseDistrict: "Chọn quận/huyện",
    chooseCity: "Chọn tỉnh/thành phố",
    chooseWard: "Chọn phường/xã",
    order: "Đặt hàng",
    moreInformation: "Thông tin thêm",
    promotionHint: "Enter promo code or gift code here.",
    note: "Ghi chú",
    placeNote: "Ghi chú đơn hàng",
    selectReason: "Select cancellation reason",
    chooseImage: "Chọn ảnh",
    newImage: "Chụp ảnh mới",
    chooseLibrary: "Chọn ảnh có sẵn",
    supplier: "Supplier",
    warehouseAddress: "Receive goods at the warehouse",
    specificAddress: "Receive goods at a specific address",
    deposit: "Thanh toán trước",
    desiredDate: "Ngày mong muốn nhận hàng",
    noMoreInformation: "Không còn thông tin thêm nào",
    total: "Tổng thanh toán",
    prepayment: "Thanh toán trước",
    contrast: "(Đối trừ công nợ)",
    stillInDebt: "Còn nợ",
    product: "products",
    applyPromoHint: "Apply promo code for discount",
    orderSuccess: "Order success",
    waitingPickup: "Chờ lấy hàng",
    invoiceCode: "Mã hoá đơn",
    invoiceDate: "Ngày tạo hoá đơn",
    placeholderDate: "dd/mm/yyyy",
    invoiceDateExpiration: "Ngày đến hạn",
    termsOfPayment: "Hoặc điều khoản thanh toán",
    placeholderTermsOfPayment: "Chọn điều khoản thanh toán",
    accountingBook: "Sổ kế toán",
    placeholderAccountingBook: "Chọn sổ kế toán",
    provisional: "Tạm tính",
    totalPrice: "Tổng tiền (chưa thuế)",
    totalInvoice: "Tổng hoá đơn",
    symbol: "Kí hiệu",
    invoiceType: "Loại hoá đơn",
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative:
      "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel:
        "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
    intro: {
      skip: "Bỏ qua",
    },
    forgotPasswordMerchant: {
      forgotPassword: "Forgot Password",
      continue: "Continue",
    },
    accountSecurity: {
      accountSecurity: "Account security",
    },
    dialogOtp: {
      OTP: "OTP",
      close: "Đóng",
    },
    notificationSetting: {
      notificationSetting: "Cài đặt thông báo",
    },
  },
  bottomNavigation: {
    dashboard: "Dashboard",
    order: "Orders",
    product: "Products",
    users: "Users",
  },
  menuDrawer: {
    textBuy: "Mua Hàng",
    textSell: "Bán Hàng",
    inforStore: "Thông tin cửa hàng",
    inforMerchant: "Thông tin merchant",
    securityAccount: "Bảo mật tài khoản",
    changePass: "Đổi mật khẩu",
    settingNoti: "Cài đặt thông báo",
    introduct: "Giới thiệu",
    feedback: "Góp ý",
    logout: "Đăng xuất",
  },
  inforMerchant: {
    codeCompany: "Mã công ty",
    city: "Tỉnh/Thành phố",
    district: "Quận/Huyện",
    ward: "Phường/Xã",
    address: "Địa chỉ",
    gender: "Giới tính",
    email: "Email",
    phoneNumber: "Số điện thoại",
    bank: "Tên ngân hàng",
    accountNumber: "Số tài khoản",
    accountHolder: "Tên tài khoản ngân hàng",
    bankBranch: "Chi nhánh",
    setTingShop: "Cài đặt cửa hàng",
    setLanguage: "Chọn ngôn ngữ",
    setQR: "Mã QR của tôi",
    userManual: "HD sử dụng",
    InforMerChant: "Thông tin merchant",
    btnInfor: "Thông tin tài khoản",
    btnSecutityAcc: "Bảo mật tài khoản",
    btnChangePassword: "Đổi mật khẩu",
    btnIntroduct: "Giới thiệu",
    btnFeedback: "Góp ý",
    btnSettingBell: "Cài đặt thông báo",
    merChantType: " Kiểu merchant",
    inforBank: "Thông tin ngân hàng",
    cancel: "Hủy",
    logout: "Thoát",
    titleLogOut: "Bạn có chắc chắn muốn đăng xuất",
    loading: "Loading",
    introduction: "Giới thiệu",
    introductionbody: "Điều khoản và thỏa thuận",
    feedback: "Đánh giá chúng tôi",
    question: "FAQ",
    titleFeedBackInModal: "Đánh giá ứng dụng Platfrom",
    contentFeedBackInModal:
      "Nhấn vào ngôi sao để đánh giá ứng dụng trên App Store",
    btnCancel: "Không phải bây giờ",
    btnSen: "Gửi",
    titleAfterFeedBack: "Cảm ơn bạn đã đánh giá",
    contentAfterFeeBack: "Bạn cũng có thể viết bình luận",
    ok: "Ok",
    comment: "Viết bình luận",
    clickStar: "Nhấn vào ngôi sao để xếp hạng",
    thankYou: "Cảm ơn bạn đã đánh giá",
    send: "Đã gửi",
    faq: "FAQ",
    title: "Chúng tôi ở đây để giúp bạn tìm hiểu mọi thứ trên ứng dụng Apus",
    contenFAQ1:
      "Tại Apus Platfform, chúng tôi mong đợi bạn bắt đầu một ngày mới, tốt hơn và hạnh phúc hơn ngày hôm qua. Chúng tôi đã giúp bạn chia sẻ mối quan tâm của mình hoặc kiểm tra các câu hỏi thường gặp của chúng tôi được liệt kê bên dưới.",
    accountSecurity: "Bảo Mật tài khoản",
    tile: "Mẫu",
    All: "All",
    areDelivering: "Đang giao",
    Delivered: "Đã giao",
    Cancelled: "Đã hủy",
    DetailExample: "Chi tiết yêu cầu mẫu",
    DetailTitleExample: "Sản phẩm đã yêu cầu mẫu",
    ResquestExample: "Yêu cầu mẫu",
    btnAll: "Tất cả",
    Apodio: "Apodio",
    Category: "Danh mục",
    Arrange: "Sắp xếp",
  },
  ExampleScreen: {
    btnContinue: "Tiếp tục",
  },
  feedBack: {
    improtFeedback: "Nhập góp ý",
  },
  ClientScreen: {
    client: "Khách hàng",
    groupClient: "Khách hàng",
    btnAddClient: "Nhóm khách hàng",
    detailClient: "Chi tiết khách hàng",
    createNew: "Tạo mới khách hàng",
    pleaseSelectTypeClient: "Vui lòng chon kiểu khách hàng",
    phoneNumber10: "Vui lòng nhập đủ 10 số",
    pleaseInputPhoneNumber: "Vui lòng nhập số điện thoại",
    pleaseInputName:"Vui lòng nhập họ tên",
    txtChoiceClient: "Vui lòng chọn khách hàng"
  },
  NCCScreen: {
    idSupliers: "Mã nhà cung cấp",
    name: "Tên",
    placeholderName: "Nhập tên",
    placeholderIdSuppliers: "Ví dụ : NCC00001",
    nameSuppliers: "Tên nhà cung cấp",
    placeholderNameSuppliers: "Ví dụ : Công ty TNHH Hà Nội",
    type: "Kiểu",
    groupSuppliers: "Nhóm NCC",
    phone: "Số điện thoại",
    enterPhone: "Nhập số điện thoại",
    placeholderCodeSupplier: "Ví dụ : NCC000001",
    email: "Email",
    placeholderEmail: "Nhập địa chỉ email",
    idCard: "Số giấy tờ định danh",
    placeHolderIdCard: "Nhập số giấy tờ định danh ",
    address: "Địa chỉ",
    placeholderAddress: "Nhập địa chỉ",
    selectedGroupSuppliers: "Chọn nhóm nhà cung cấp",
    moreInformation: "Thông tin thêm",
    codeSupplier: "Mã nhà cung cấp",
    addressInfomation: "Thông tin địa chỉ chính",
    region: "Vùng",
    selectRegion: "Chọn vùng",
    addAnotherAddress: "Thêm địa chỉ khác",
    addBank: "Thêm ngân hàng",
    bankInformation: "Thông tin ngân hàng",
    contactPersonInformation: "Thông tin người liên hệ",
    addContactPersonInformation: "Thêm thông tin ngươi liên hệ",
    selectedAddress: "Chọn địa chỉ",
    accountNumber: "Số tài khoản",
    enterAccountNumber: "Nhập số tài khoản",
    accountName: "Tên chủ tài khoản",
    enterAccountName: "Nhập tên chủ tài khoản",
    addContactPerson: "Thêm người liên hệ",
    nickName: "Danh xưng",
    selectNickName: "Chọn danh xưng",
    position: "Chức vụ",
    placeholderPosition: "Nhập chức vụ",
    gender: "Giới tính",
    placeholderGender: "Nhập giới tính",
    dayBirth: "Ngày sinh",
    personalIdentification: "Số giấy tờ định danh cá nhân",
    placeholderPersonalIdentification: "Nhập số giấy tờ",
  },
  debtScreen: {
    receivables: "Phải thu",
    mustPay: "Phải trả",
    toPaydebt: "Công nợ phải trả",
    totalNumberOfSuppliersIncurringDebt:
      "Tổng số nhà cung cấp đang phát sinh công nợ",
    totalDebtMustPay: "Tổng số công nợ phải trả",
    nameProviders: "Tên NCC",
    totalLiabilities: "Tổng nợ",
    paid: "Đã trả",
    notThing: "Bạn không có phát sinh công nợ với NCC nào",
    sort: "Sắp xếp",
    theMoneyHaveToPay:"Số tiền phải trả",
    totalDebt: "Tổng nợ",
    up: "Tăng dần",
    dow: "Giảm dần",
    debtNeedToPaid: "Nọ cần thanh toán",
    paymentTerm : " Hạn thanh toán gần nhất",
    
  },
  productScreen: {
    create_product: "Tạo sản phẩm",
    directory: "Tất cả danh mục",
    select_catgory: "Chọn danh mục",
    trademark: "Thương hiệu",
    select_trademark: "Chọn thương hiệu",
    tag: "Tag",
    select_tag: "Chọn tag",
    unit_group: "Nhóm đơn vị tính",
    select_unit_group: "Chọn nhóm đơn vị tính",
    create_unit_group: "Tạo nhóm đơn vị tính",
    manage_multiple_units: "Quản lý nhiều đơn vị tính của sản phẩm",
    unit: "Chọn đơn vị tính",
    select_unit: "Chọn đơn vị tính",
    create_unit: "Tạo đơn vị tính",
    filter: "Sắp xếp",
    directoryName: "Tên danh mục",
    placeholderDirectoryName: "Nhập tên danh mục",
    SKU: "Mã SKU",
    placeholderSKU: "Nhập/Quét",
    productName: "Tên sản phẩm",
    placeholderProductName: "Ví dụ: Gạch lát 94583",
    minimum: "Mua tối thiểu",
    priceProduct: "Giá sản phẩm",
    describe: "Mô tả",
    priceRetail: "Giá lẻ",
    priceCapital: "Giá vốn",
    priceList: "Giá niêm yết",
    priceWholesale: "Giá buôn",
    Notification: "Thông báo",
    NotificationDelete: "Bạn có chắc chắn muốn xoá danh mục này không ?",
    ProductDelete: "Bạn có chắc chắn muốn xoá sản phẩm này không ?",
    NotificationDeleteFail:
      "Danh mục này đang có sản phẩm, bạn không được phép xoá.",
    BtnNotificationAccept: "Xác nhận",
    BtnNotificationBack: "Để sau",
    BtnNotificationDeleteFail: "Đồng ý",
    placeholderPrice: "0.000",
    nameGroupAttribute: "Tên nhóm thuộc tính",
    save: "Lưu",
    saveAndChange: "Lưu và chọn",
    productClassification: "phân loại SP",
    cancel: "Hủy",
    createUnit: "Tạo đơn vị tính",
    NotifyModal: "Bạn cần nhập đầy đủ thông tin trước khi thêm khoảng giá mới",
    NotifyCloseModal: "Bạn có chắc chắn muốn thoát ?",
    Perspective: "Xem phối cảnh 3D",
    validateMin: "Số lượng không được trùng lặp",
    product: "sản phẩm",
    addBank: "Thêm ngân hàng",
  },
  detailScreen: {
    headerClassify: "Chi tiết phân loại",
    information: "Thông tin chung",
    productCode: "Mã sản phẩm",
    nameProduct: "Tên sản phẩm",
    status: "Trạng thái",
    minimumPurchase: "Mua tối thiểu",
    priceProduct: "Giá sản phẩm",
    tag: "Tag",
    brand: "Thương hiệu",
    management: "Hình thức quản lý",
    unit: "Đơn vị tính gốc",
    properties: "Thuộc tính chung",
    detailProperty: "Xem chi tiết thuộc tính",
  },
  createProductScreen: {
    classify: "Phân loại",
    details:
      "Tạo ra các phiên bản khác nhau của sản phẩm như màu sắc, kích thước, size.. bằng các thêm các thuộc tính tương ứng",
    addProperties: "Thêm thuộc tính",
    information: "Thêm thông tin",
    canBuy: "Có thể mua",
    edit_product: "Sửa sản phẩm",
    cancel: "Hủy",
    done: "Hoàn tất",
    openCamera: "Chụp ảnh",
    uploadImage: "Tải ảnh lên",
    infoSupplier: "Thông tin nhà cung cấp",
    noSelectSupplier: "Chưa có nhà cung cấp nào được chọn",
    inventory_management: "Quản lý tồn kho",
    form_of_management: "Hình thức quản lý",
    infoMore: "Thông tin thêm",
    manageMultipleProduct: "Quản lý nhiều đơn vị tính của sản phẩm",
    createUnits: "Tạo đơn vị tính",
    originalUnit: "Đơn vị gốc",
    conversion: "Đơn vị quy đổi",
    conversionRate: "Tỷ lệ quy đổi",
    description: "Mô tả",
    addDescription: "Thêm mô tả",
    productClassification: "Phân loại sản phẩm",
    notificationAddAllInfoProduct:
      "Bạn đã thêm tất cả thông tin khác của sản phẩm",
    errorMessage: "Đã có lỗi xảy ra. Vui lòng thử lại!",
  },
  filterScreen: {
    new: "Mới nhất",
    aToZ: "Từ A -> Z",
    older: "Cũ nhất",
    zToA: "Từ Z -> A",
    priceHighToLow: "Cao đến thấp",
    priceLowToHigh: "Thấp đến cao",
    filterTime: "Thời gian tạo",
    filterName: "Theo tên",
  },
  tranSacTionHistory: {
    tranSactionHistory: "Lịch sử giao dịch",
    transactionHistoryDetail: "Chi tiết lịch sử giao dịch",
    paymentDetail: "Chi tiết thanh toán",
    paymentOder: "Thanh toán đơn hàng",
    transactionType: "Loại giao dịch",
    merchantPhone: "SDT đại lý",
    merchantName: "Tên đại lý",
    status: "Trạng thái",
    transactionTime: "Thời gian giao dịch",
    amount: "Thành tiền",
    fee: "Thuế ",
    totalAmount: "Tổng cộng",
  },
  chooseSupplierScreen: {
    placeholderSearch: "Tìm nhà cung cấp theo mã và tên",
  },
  addAttribute: {
    title: "Nhóm thuộc tính",
    hint: "Chọn nhóm thuộc tính",
    header: "Chọn thuộc tính",
    addAttribute: "Tạo nhóm thuộc tính mới",
    selectedValue: "Chọn giá trị",
  },
  editAttribute: {
    headerText: "Sửa thuộc tính",
  },
  vendorScreen: {
    vendor: "nhà cung cấp",
    header: "Chọn nhà cung cấp",
  },
  productDetail: {
    productClassification: "product classification",
    retailPrice: "Giá lẻ",
    wholesalePrice: "Giá buôn",
    groupName: "Tên nhóm",
    originUnit: "Đơn vị gốc",
    selectOriginUnit: "Chọn đơn vị tính",
  },
  successScreen: {
    btnBack: "Quay lại trang chủ",
    labelSuccess: "Tạo mới thành công",
    titleSuccess: "Bạn đã thêm mới sản phẩm thành công",
    btnCreate: "Tạo thêm sản phẩm",
    btnDetail: "Xem chi tiết sản phẩm",
    titleSuccessOrder: "Bạn đã tạo đơn hàng thành công",
    btnCreateOrder: "Tạo thêm đơn hàng",
    btnDetailOrder: "Xem chi tiết đơn hàng",
  },

  wareHouse: {
    wareHouse: "Kho hàng",
    wareBook: "Sổ kho",
    checkWare: "Kiểm kho",
    importBook: "Sổ nhập",
    outputBook: "Sổ xuất",
    inTem: "In tem ra vạch",
    turnOnInventory: "Bật tồn kho",
    survivalValue: "Giá trị tồn",
    report: "Báo cáo",
    idProduct: "Mã sản phẩm",
    quantity: "Số lượng",
    inforWareHouse: "Thông tin kho hàng",
    confirm: "Xác nhận",
    createOder: "Xuất hàng",
    createProduct: "Kiểm kho",
    createBatchProduct: "Nhập hàng",
  },

  GoodsExportBook: {
    createExportGoods: "Tạo xuất hàng",
    exportGoods: "Xuất hàng",
    product: "Sản phẩm",
    contenue: "Tiếp tục",
    shippingDetails: "Chi tiết xuất hàng",
    submitBallot: "Gửi phiếu",
    dowloadBallot: "Tải phiếu",
    collapse: "Thu gọn",
    notCreateExportGoods: "Chưa có phiếu xuất nào được tạo",
  },
  detailPallot: {
    ballotDetail: "Chi tiết phiếu",
    DeliveryNote: "Phiếu xuất hàng",
    name: "TÊN",
    total: "Tổng số lượng",
    inPallot: "In phiếu",
    printerIsNotConnected: "Máy in chưa được kết nối",
    later: "Để sau",
    settingPrinter: " Cài đặt máy in",
  },
  checkInventory: {
    createInventorySeets: "Tạo phiếu xuất hàng",
    manageInventorySheets: "Quản lý phiếu kiểm kho",
    btnAddProduct: "Thêm sản phẩm",
    searchAndSelectProductsMaterialsToStartCheckingGoods:
      "tìm kiếm và lựa chọn sản phẩm Chất liệu để bắt đầu kiểm tra hàng ",
  },
  ImprotGoodsBook: {
    createImportGoods: "Tạo nhập hàng",
    ImportGoods: "Nhập hàng",
    createGoodsReceipt: "Tạo phiếu nhập hàng",
    supplier: "Nhà cung cấp",
    debit: "Ghi nợ",
    addProduct: "+ Thêm sản phẩm",
    brick: "Gạch 1566CB502 60x60",
    price: "Giá 0",
    note: "Ghi chú",
    Total: "Tổng số lượng",
    totalCostOfGoods: "Tổng tiền hàng",
    discount: "Chiết khấu",
    costsIncurred: "Chi phí phát sinh",
    paymentConfirmation: "Xác nhận thanh toán",
    totalAmount: "Tổng tiền",
    iPaid: "Tôi đã trả",
    funds: "Nguồn tiền",
    electronicWallet: "Ví điện tử",
    cash: "Tiền mặt",
    unclassified: "Chưa phân loại",
    bank: "Ngân hàng",
    storeWallet: "Ví của hàng",
    detailImportReceipt: "Chi tiết nhập hàng",
    cancelImportOrder: "Hủy đơn nhập hàng",
    refund: "Hoàn tiền",
    recordTheTransactionInDebt: "Ghi lại giao dịch vào công nợ",
    back: "Quay lại",
    confrim: "Xác nhận",
    deletionWarning:
      "Các giao dịch liên quan đến đơn nhập hàng này sẽ bị xóa. Bạn muốn xóa giao dịch liên quan?",
    importCoupon: "Phiếu nhập hàng",
  },
  itemConversion: {
    dialogNoti: "Bạn cần nhập đầy đủ thông tin trước khi thêm khoảng giá mới",
  },
  newAttribute: {
    newAttributeDialog: "Tạo mới nhóm thuộc tính thành công",
  },
  suppliers: {
    infoDetails: "Thông tin chi tiết",
    group: "Nhóm NCC:",
    email: "Email:",
    type: "Kiểu:",
    numberIdentification: "Số giấy tờ định danh:",
    infoAddress: "Thông tin địa chỉ",
    deliveryAddress: "Địa chỉ giao hàng",
    storageAddress: "Địa chỉ lưu kho",
    infoBank: "Thông tin ngân hàng",
    bankName: "Ngân hàng:",
    bankNumber: "Số tài khoản:",
    bankAccount: "Tên chủ tài khoản:",
    confirm: "Xác nhận",
    amountOwed: "Số tiền còn nợ: ",
    paymentAmount: "Số tiền thanh toán",
    updateDebt: "Cập nhật công nợ",
    update: "Cập nhật",
    stillInDebt: "Còn nợ",
    paid: "Đã thanh toán",
    totalAmountPaid: "Tổng tiền cần thanh toán",
    debtLimit: "Hạn mức nợ còn lại",
    deDebt: "Hạn mức nợ",
    Bought: "Đã mua:",
    thisMonth: "Tháng này",
    all: "Tất cả",
    addContact: "Thêm liên hệ",
  },
  warehouseBook: {
    warehouseBook: "Sổ kho",
    ExistingAtTheBeginningOfThePeriod: "Tồn đầu kỳ",
    DuringThePeriod: "Nhập trong kỳ",
    ExportedInPeriod: "Xuất trong kỳ",
    EndingStocks: "Tồn cuối kỳ",
    productDelivery: "Xuất hàng",
    importGoods: "Nhập hàng",
    checkInventory: "Kiểm kho",
    time: "Thời gian",
    orCustomizeTheTime: "Hoặc tùy chỉnh thời gian",
    filter: "Bộ lọc ",
    from: "Từ",
    to: "Đến",
    classify: "Phân loại",
    sell: "Bán hàng",
    return: "Hoàn trả",
    initializeWarehouse: "Khởi tạo kho",
    editInventory: "Sửa tồn kho",
    editCostPrice: "Sửa giá vốn",
    deleteProduct: "Xóa sản phẩm",
    deleteRawMaterials: "Xóa nguyên vật liêu",
    different: "Khác",
    typeOfGoods: "Loại hàng hóa",
    product: "Sản phẩm",
    rawMaterials: "Nguyên vật liệu",
    reportDetail: " Báo cáo chi tiết",
    downloadNow: "Tải ngay",
    reset: "Thiết lập lại",
    apply: "Áp dụng",
  },
  printInvoiceScreen: {
    printInvoice: "In hoá đơn",
    name: "Tên khách hàng:",
    address: "Địa chỉ:",
    phone: "Số điện thoại:",
    product: "Sản phẩm",
    unitPrice: "Đơn giá",
    quality: "Số lượng",
    amountPrice: "Thành tiền",
    amountUntaxed: "Cộng tiền hàng",
    totalPrice: "Tổng tiền thanh toán",
    invoice: "Hoá đơn",
  },
  orderDetailScreen: {
    sent: "Chờ xác nhận",
    sale: "Đang thực hiện",
    done: "Đã hoàn thành",
    cancel: "Đã huỷ",
    no: "Chưa thanh toán",
    toInvoice: "Chờ thanh toán",
    partialInvoice: "Thanh toán một phần",
    invoiced: "Đã thanh toán",
  },
  selectClient: {
    selectClient: "Chọn khách hàng",
    selectCustomerForSalesOrder: "Chọn khách hàng cho đơn bán",
    selected: "Lựa chọn",
    add: "Thêm mới",
    nameClient: "Tên khách hàng",
    customerType: "Kiểu khách hàng",
    selectCustomerType: "Chọn kiểu khách hàng",
    filter: "Bộ lọc",
    followName: "Theo tên",
    timeCreate: "Thời gian tạo",
    tag: "Tag",
    new: "Mới nhất",
    old: "Cũ nhất",
    aToz: "Từ A -> Z",
    zToa: "Từ Z -> A",
    floorTiles: "Gạch lát",
    wallTiles: "Gạch ốp",
    brick40x40: "Gạch 40*40",
    brick60x60: "Gạch 60*60",
    brick80x80: "Gạch 80*80",
    createClient: "Tạo khách hàng",
  },
  selectPriceListApply: {
    selectPriceListApply: "Chọn bảng giá áp dụng",
    noApplyPriceList: "Không áp dụng bảng giá",
  },
  calendar : {
    
    today : 'Hôm nay',
    last7days : '7 ngày trước',
    thisMonth : 'Tháng này',
    reset : 'Đặt lại',
    done : 'Xác nhận'
  }

  // @demo remove-block-end
};

export default en;
export type Translations = typeof en;
