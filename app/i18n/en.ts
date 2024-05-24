const en = {
  common: {
    ok: "OK!",
    cancel: "Hủy",
    back: "Back",
    confirm: "Xác nhận",
    logOut: "Log Out",
    listCompany: "Danh sách công ty",

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
  },
  txtDialog: {
    txt_title_dialog: "Thông báo",
    content_exit_dialog: "Bạn có chắc chắn muốn thoát?",
    settings: "Settings",
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
  changePass: {
    changePass: "Change Pass",
    importOldPass: "Enter old password",
    next: "Next",
  },
  dashboard: {
    storeInformation: "Store information",
    promotions: "Promotions",
    transactionHistory: "Transaction history",
    sampleRequest: "Sample request",
    orders: "Orders",
    product: "Product",
    moreFeatures: "More features",
    supply: "Supply",
    debt: "Debt",
    revenue: "Revenue",
    revenueMonth: "Revenue this month",
    titleBanner: "Participating sales programs",
    titleOrder: "Orders being processed",
    start: "Start: ",
    end: "End: ",
    goods: "Goods:",
    promotionsInvoice: "Promotions:",
    totalAmount: "Total amount to be paid:",
    estimated: "Estimated order tonnage:",
    orderNCC: "Order NCC",
    orderApodio: "Order Apodio",
    request: "Sample issuance request",
    amountProduct: "Amount product:",
    client: "Khách hàng",
    totalTax: "Total tax:",
  },
  order: {
    orderDetail: "Order detail",
    copy: "Copy",
    return: "Return",
    printInvoice: "Print",
    sendInvoice: "Send invoice",
    quantity: "Qty: ",
    date: "Date",
    money: "Money",
    cash: "Cash",
    confirm: "Confirm",
    addProduct: "Add product",
    cancellationReason: "Cancellation reason",
    sellerConfirm: "Seller confirmed",
    deliveryAddress: "Delivery address",
    staff: "Staff: ",
    paymentMethods: "Payment methods",
    selectPayment: "Select a payment method",
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
    addAddress: "Add new address",
    phone: "Phone",
    address: "Address",
    deFault: "Default",
    addressDefault: "Set address as default",
    district: "District",
    city: "City",
    ward: "Ward",
    chooseDistrict: "Choose the district",
    chooseCity: "Choose the city",
    chooseWard: "Choose the ward",
    order: "Order",
    moreInformation: "More information",
    promotionHint: "Enter promo code or gift code here.",
    note: "Note",
    placNote: "Order notes",
    selectReason: "Select cancellation reason",
    chooseImage: "Choose image",
    newImage: "Take new photos",
    chooseLibrary: "Select available photos",
    supplier: "Supplier",
    warehouseAddress: "Receive goods at the warehouse",
    specificAddress: "Receive goods at a specific address",
    deposit: "Deposit",
    desiredDate: "Desired date to receive goods",
    noMoreInformation: "No further information available",
    total: "Total",
    prepayment: "Prepayment",
    stillInDebt: "Still in debt",
    product: "products",
    applyPromoHint: "Apply promo code for discount",
    orderSuccess: "Order success",
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
    titalLogOut: "Bạn có trắc muốn đăng xuất",
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

  ClientScreen: {
    client: "Khách hàng",
    groupClient: "Khách hàng",
    btnAddClient: "Nhóm khách hàng",
    detailClient: "Chi tiết khách hàng",
  },
  NCCScreen: {
    idSupliers: "Mã nhà cung cấp",
    placeholderIdSuppliers: "Ví dụ : NCC00001",
    nameSuppliers: "Tên nhà cung cấp",
    placeholderNameSuppliers: "Ví dụ : Công ty TNHH Hà Nội",
    type: "Kiểu",
    groupSuppliers: "Nhóm NCC",
    phone: "Số điện thoại",
    placeholderPhone: "Ví dụ : 0123456789",
    email: "Email",
    placeholderEmail: "Nhập địa chỉ email",
    idCard: "Số giấy tờ định danh",
    placeHolderIdCard: "Nhập số giấy tờ định danh ",
    address: "Địa chỉ",
    placeholderAddress: "Nhập địa chỉ",
  },
  productScreen: {
    directory: "Tất cả danh mục",
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
  },
  createProductScreen: {
    classify: "Phân loại",
    details:
      "Tạo ra các phiên bản khác nhau của sản phẩm như màu sắc, kích thước, size.. bằng các thêm các thuộc tính tương ứng",
    addProperties: "Thêm thuộc tính",
    information: "Thêm thông tin",
    canBuy: "Có thể mua",
    cancel: "Hủy",
    done: "Hoàn tất",
    openCamera: "Chụp ảnh",
    uploadImage: "Tải ảnh lên",
    infoSupplier: "Thông tin nhà cung cấp",
    noSelectSupplier: "Chưa có nhà cung cấp nào được chọn",
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
  },
  chooseSupplierScreen: {
    placeholderSearch: "Tìm nhà cung cấp theo mã và tên",
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
    labelSuccess: "Tạo mới thành công",
    titleSuccess: "Bạn đã thêm mới sản phẩm thành công",
    btnCreate: "Tạo thêm sản phẩm",
    btnDetail: "Xem chi tiết sản phẩm",
    btnBack: "Quay lại trang chủ",
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
  },
  GoodsExportBook: {
    createExportGoods: "Tạo xuất hàng",
    exportGoods: "Xuất hàng",
    product: "Sản phẩm",
    contenue: "Tiếp tục",
  },
  checkInventory: {
    createInventorySeets: "Tạo phiếu xuất hàng",
    manageInventorySheets: "Quản lý phiếu kiểm kho",
    btnAddProduct: "Thêm sản phẩm",
    searchAndSelectProductsMaterialsToStartCheckingGoods:
      "tìm kiếm và lựa chọn sản phẩm Chất liệu để bắt đầu kiểm tra hàng ",
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

  // @demo remove-block-end
};

export default en;
export type Translations = typeof en;
