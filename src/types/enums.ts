export const enum Api {
  //listing-page
  topColleges = 'college-info/top',
  // top collegs under place
  topCollegesList = 'college-info/top-colleges',
  // top colleges under courses
  topCourseColleges = 'college-info/top-course',

  // colleges page data
  topCollegesPagedata = 'college-info/top-colleges-pagedata',
  categoryWisePagedata = 'college-info/top-colleges-category-pagedata',
  courseWisePagedata = 'college-info/top-colleges-course-pagedata',

  // college-courses
  topCoures = 'college-info/courses',

  // find colleges
  searchColleges = 'college-info/search',

  //overview
  collegeBanner = 'college/banner',
  collegeFaq = 'college/faq',

  // submenu
  collegeSubmenu = 'college/submenu',

  //overview
  collegeOverview = 'overview',
  collegeDescription = 'college/overview/descriptions',
  collegeReviews = 'college/overview/reviews',
  collegeOverAllRating = 'college/reviews/reviewDescription',
  collegeLatestBlogs = 'college/overview/latestBlogs',
  collegeAdmission = 'college/overview/admission',
  collegeHighlights = 'college/overview/highlights',
  collegeGallery = 'college/overview/gallery',
  collegeExamsAndCutoffs = 'college/overview/examsAndCutoffs',
  collegeCourseAndFees = 'college/overview/courseAndFees',
  collegeFacilities = 'college/overview/facilities',
  collegePlacements = 'college/overview/placements',
  collegeOtherColleges = 'college/otherColleges',
  collegeCategory = 'college/collegeCategory',
  collegeReviewDescription = 'college/reviews/reviewDescription',

  //amenities
  campusOverview = 'college/amenities/descriptions',
  facilityList = 'college/amenities/facilities',
  amenitiesdesc = 'college/amenities/contentSection',

  // Admission-Eligibility
  collegeAdmissionEligibility = 'college/admission/admissionDetail',
  collegeDescriptions = 'college/admission/descriptions',

  // faculty
  collegeFacultyDescription = 'college/faculty/facultyDesc',
  collegeFacultyProfessors = 'college/faculty/professorsList',

  //contact
  contactDetails = 'college/contact/contactDetails',
  getNearByDetails = 'college/contact/nearBy',
  getMap = 'college/contact/mapIframe',

  //affiliated college
  collegeAffiliatedList = 'affiliated/college/list',

  //placement
  collegePlacementDescription = 'college/placement/placementDescription',
  collegePlacementTopRecruiters = 'college/placement/topRecruiters',
  collegePlacementGraduations = 'college/placement/graduations',
  collegePlacementPercentage = 'college/placement/placements',
  collegePlacementMedianSalary = 'college/placement/medianSalary',
  collegePlacementYoutubeShorts = 'college/placement/youtubeShorts',

  //pictures
  collegePictures = 'college/pictures/pictures',

  // student strength
  collegeStudentStrengthDesc = 'college/student-strength/descriptions',
  collegeStudentsAdmissionCategories = 'college/student-strength/approved-intake',
  collegeStudentsAdmissionIntake = 'college/student-strength/approved-bar',
  collegeTotalStudents = 'college/student-strength/totalStudent',
  collegeStudentsStrength = 'college/student-strength/studentBar',
  collegeStudentDiversity = 'college/student-strength/diversity',
  //question and answer
  collegeQuestionAndAnswer = 'college/questAndAns/questions',
  collegeQuestionAndReplay = 'college/questAndAns/questionAndAnswer',
  replayPost = 'api/question-api/postreplay-api',
  questionPost = 'api/question-api/postquestion-api',
  //post api
  collegePostQuestion = 'college/questAndAns/addQuestion',
  collegePostReplay = 'college/questAndAns/addReplay',
  // review-page
  collegeReviewStudentReviews = 'college/reviews/studentReviews',
  addReview = 'college/reviews/addReviews', //---- post api
  // course and fees cutoff
  collegeCourseAndFeesCutoff = 'college/course-fees/cutoff/cutoffResult',
  collegeCourseAndFeesCutoffCaste = 'college/course-fees/cutoff/caste',
  collegeCourseAndFeesCutoffGender = 'college/course-fees/cutoff/gender',
  collegeCourseAndFeesCutoffQuota = 'college/course-fees/cutoff/quota',
  //cutoff
  collegeCutoffDescriptions = 'college/cutoff/descriptions',
  collegeCutoffExams = 'college/cutoff/examsAndCutoffs',
  collegeCutoffForm = 'college/cutoff/cutoffForm',
  collegeCutofResult = 'college/cutoff/cutoffResult',
  //course fees inner page - fees structure
  collegeCourseFeeStructure = 'college/course-fees/feesStructure',
  //inner page data
  collegeInnerPageData = 'college/innerPageData',

  //course-fees
  collegeCourseFees = 'course-fees',
  collegeCourseFeesDescription = 'college/course-fees/courseFeeDesc',
  collegeCourseFeesCourseList = 'college/course-fees/courseList',
  collegeCourseFilterCourseList = 'college/course-fees/filterCourseList',
  // inner page Question & Answer
  collegeInnerQuestions = 'college/courseAndFees/questAndFees/question',
  collegeInnerQuestionsandAnswers = 'college/courseAndFees/questAndFees/quesAndAns',
  innerQuestionReplay = 'api/inner-quesandans-api/replay-api',
  innerQuestionPost = 'api/inner-quesandans-api/question-api',
  // inner page Question & Answer Post API
  collegeInnerQuestion = 'college/courseAndFees/questAndFees/addQuestion',
  collegeInnerQuestionreply = 'college/courseAndFees/questAndFees/addReplay',
  collegeStudentDivesityStrength = 'college/student-strength/student',

  //course fees inner page
  collegeOtherCourse = 'college/courseAndFees/overview/otherCourses',

  //course fees inner page - overview
  collegeFeesInnerOverview = 'college/courseAndFees/overview/courseDetails',
  collegeFeesSeatAllocationOverview = 'college/courseAndFees/overview/roundWiseSeats',
  collegeFeesCutoffClosingRankOverview = 'college/courseAndFees/overview/cutoffClosingRank',
  collegeCourseIntakeOverview = 'college/courseAndFees/overview/courseIntake',
  courseAllotedSeatMat = 'college/courseAndFees/overview/alloted/seat-matrix',
  courseRankAdmittedSeat = 'college/courseAndFees/overview/roundwise/admit-allot',
  courseAdmittedSeatMat = 'college/courseAndFees/overview/admittedList',

  // bookmark
  studentGetBookmark = 'user/college/bookmark',
  studentPostBookmark = 'user/college/add-bookmark',
  studentPutBookmark = 'user/college/remove-bookmark',
  // user authentication
  userSignUp = 'engineering/college/authentication/signUp-otpgeneration',
  userSignIn = 'engineering/college/authentication/signIn-otpgeneration',
  signIn = 'api/signup-api',
  verifyOtp = 'engineering/college/authentication/verify-otp',
  resendOtp = 'engineering/college/authentication/resend-otp',
  userData = 'user/college/user-data',
  //college iq page
  collegeList = 'engineering/free-tool/collegeIq/college-list',
  collegeIns = '/api/collegeiq-api/college-ins-api',
  courseCutoff = '/api/collegeiq-api/course-api',
  collegeDetails = '/api/collegeiq-api/college-details-api',
  collegeInsType = 'college-info/search',
  courseCutoffDetails = 'engineering/free-tool/collegeIq/cutoff',
  collegeInfo = 'engineering/free-tool/collegeIq/college-detail',
  medScoreToRank = 'medical/college/scoretorank',
  engScoreToRank = 'engineering/college/score/score-to-rank',
  // compare college info
  compareBaseUrl = 'college/compare-colleges',
  collgeCompareRankingResult = 'colleges-ranking-result',
  collgeCompareDetailsResult = 'colleges-details-result',
  collgeCompareFacilitiesResult = 'colleges-facilities-result',
  collgeCompareApprovedIntakeResult = 'colleges-approvedIntake-result',
  collgeCompareStudentStrengthResult = 'colleges-student-strength-result',
  collgeCompareUgStudentResult = 'colleges-ug-students-result',
  collgeCompareUgGraduationResult = 'colleges-ug-graduation-result',
  collgeCompareUgPlacementResult = 'colleges-ug-placement-result',
  collgeCompareCollegesPhdResult = 'colleges-phd-result',
  collgeCompareIprResult = 'colleges-ipr-result',
  collgeCompareFundResult = 'colleges-fund-result',
  collgeCompareCapitalExpenditureResult = 'colleges-capital-expenditure-result',
  collgeCompareOperationalExpenditureResult = 'colleges-operational-expenditure-result',
  collgeCompareFacultyresult = 'colleges-faculty-result',
  collgeCompareFeeStructureResult = 'colleges-fee-structure-result',
  compareCollegeList = 'colleges-list',
  // compare history
  compareHistoryList = 'compare-history-list',
  removeCompareHistory = 'remove-compare-history',
  compareHistoryApi = 'api/student-dashboard/compare-history',
  //Dashboard Questions And Answer
  dashboardQuestions = 'user/college/question-answer',
  studentsQuesAndAns = 'api/student-dashboard/questions-api',
  // student reviews
  studentReviews = 'user/college/review',
  // college Compare_list page
  collegeCompareList = 'engineering/free-tool/collegeIq/college-list',
  //Free-tool Future-Ai
  futureAiTool = 'engineering/free-tool/future-ai/future-ai-datalist',
  futureAitoolPost = 'engineering/free-tool/future-ai/college-info',

  //dashboard profile page
  dashboardPostProfile = 'user/college/profile',
  dashboardGetProfile = 'user/college/dashboard/user',
  verifyMobileNumber = 'user/college/verify-mobileNo',

  //dashboard  profile page-multer
  dashboardMulterUpload = 'upload/profile-picture-multer',
  dashboardS3Upload = 'upload/profile-picture-s3',
  //get your medical college
  medicalCollegeList = 'college/neet/college-list',

  // medial kyc details
  medicalCollegeInfo = 'college/neet/basicInfo',
  medicalCollegeClosingRank = 'college/neet/cutt-off/closing-rank',
  medicalCollegeAdmittedList = 'college/neet/admittedList',
  medicalCollegeAllottedList = 'college/neet/alloted/seat-matrix',
  medicalCollegeSeatAllocation = 'college/neet/seatAllocation',
  medicalCollegeAdmittedAllotted = 'college/neet/roundwise/admit-allot',
  medicalCollegeInfoApi = 'api/collegeiq-api/medical/college-info-api',
  medicalCollegeClosingRankApi = 'api/collegeiq-api/medical/closing-rank-api',
  medicalCollegeAllottedListApi = 'api/collegeiq-api/medical/allotted-seat-api',
  medicalCollegeAdmittedListApi = 'api/collegeiq-api/medical/admitted-seat-api',
  medicalCollegeSeatAllocationApi = '/api/collegeiq-api/medical/seat-allocation-api',
  medicalCollegeAdmittedAllottedApi = '/api/collegeiq-api/medical/allotted-admitted-api',

  // profile
  profileImage = 'uploads/profile',

  // Predictor_popup_modal
  basicInfoApi = 'neet/predictor/basicInfo',
  getClosingRankApi = 'neet/predictor/cutt-off/closing-rank',
  getStateAdmittedSeatApi = 'state/predictor/alloted/seat-matrix',
  getStateSeatAdmittedApi = 'state/predictor/roundwise/admit-allot',
  getStateClosingRankApi = 'predictor/state-cutt-off/closing-rank',
  stateCutOffClosingRankApi = 'state/predictor/state-cutt-off/closing-rank',

  //neet predictor form
  stateDataApi = 'neet/predictor/home-states',
  indiaCategoryApi = 'neet/predictor/all-india-category',
  stateCategoryApi = 'neet/predictor/state-category',
  getStateCategoryDependentApi = 'neet/predictor/state-wise/dropdown',
  seatTypeBasedApi = 'neet/predictor/seat-type/dropdown',
  geographicAreaBasedApi = 'neet/predictor/seat-based/dropdown',
  addFormApi = 'neet/predictor/add-neet-history',
  updateFormApi = 'neet/predictor/update-neet-history',
  getFormDataApi = 'neet/predictor/get-neet-history',
  // neet-predictor result
  aiqPredictorResult = 'neet/predictor/chances',
  statePredictorResult = 'state/predictor/chances',
  quotaData = 'neet/predictor/neet-quota',

  // Produt page
  paymentGetProduts = 'payment/get-products',
  paymentApplyCoupon = 'payment/apply-coupon',
  addPayment = 'payment/add-payment-details',
  updatePayment = 'payment/update-paymentstatus',
  addPhonePePayment = 'payment/add-phonepe-payment-details',
  getPaymentDetails = 'payment/get-payment-details',
  updatePhonePePayment = 'payment/update-phonepe-paymentstatus',
  addFreePlan = 'payment/add-freePlan',
  // elated Compared Colleges

  relatedCompareCollege = 'related-compare-college',

  // chat bot
  getNewChat = 'chatbot/getquestion-prompts',
  getChatHistory = 'chatbot/chatHistory',
  updateChatList = 'chatbot/updateChat',
  getChatList = 'chatbot/chatList',
  getUpdateChatList = 'chatbot/updateChatList',
  getTokenData = 'chatbot/get-token-details',
  getQuotaList = 'chatbot/getQuotaList',
  getStateWiseBanner = 'chatbot/getStateWiseBanner',
  updateChatbotAgent = 'chatbot/update-agent',
  getAgentDetails = 'chatbot/get-agent-details',

  // connect to mentor
  getAvailableTimeData = 'connect-to-mentor/appointmentTime',
  getTimeValueData = 'connect-to-mentor/appointmentTimeValue',
  addScheduleTimeData = 'connect-to-mentor/addAppointmentDetail',
  getScheduledDetailsData = 'connect-to-mentor/getAppointmentDetails'
}

export enum EDU_PORT {
  NEET = 'NEET',
  JEE = 'JEE'
}
