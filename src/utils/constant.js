export const BASE_URL = "http://localhost:9000";
export const YOUTUBE_EMBED_URL = "https://www.youtube-nocookie.com/embed/";
export const EMBED_VIDEO_PARAM =
  "rel=0&controls=0&showinfo=0&autohide=1&modestbranding=0&loop=1&";

export const USERS_COLLECTION = "users";
export const BANNER_COLLECTION = "banner";
export const MOVIES_COLLECTION = "movies";
export const IMAGE_COLLECTION = "images";
export const CINEMAS_COLLECTION = "cinemas";

export const ERROR_NOTIFICATION = "requestError";
export const LOGIN_NOTIFICATION = "loginNotification";

export const VIETNAMESE_NAME_REGEX =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

export const CATEGORY_NOW_SHOWING = "nowShowing";
export const CATEGORY_COMING_SOON = "comingSoon";

export const STATUS_AVAILABLE = "available";
export const STATUS_OCCUPIED = "occupied";
export const STATUS_SELECTED = "selected";

export const TYPE_VIP = "vip";
export const TYPE_REGULAR = "regular";

export const SEAT_NUMBER = 40;
export const ROW_LENGTH = 8;
export const ROW_NAME = ["A", "B", "C", "D", "E"];

export const GENRE_DATA = [
  { label: "All", value: "" },
  { label: "Action", value: "Action" },
  { label: "Documentary", value: "Documentary" },
  { label: "Musical", value: "Musical" },
  { label: "Adventure", value: "Adventure" },
  { label: "Animation", value: "Animation" },
  { label: "Comedy", value: "Comedy" },
  { label: "Crime", value: "Crime" },
  { label: "Horror", value: "Horror" },
  { label: "Mystery", value: "Mystery" },
  { label: "Thriller", value: "Thriller" },
  { label: "Drama", value: "Drama" },
  { label: "Thriller", value: "Thriller" },
  { label: "Biographical", value: "Biographical" },
  { label: "Family", value: "Family" },
];

export const LANGUAGE_DATA = [
  { label: "All", value: "" },
  { label: "English", value: "English" },
  { label: "Korean", value: "Korean" },
  { label: "Arabic", value: "Arabic" },
  { label: "Hindi", value: "Hindi" },
];

export const DAY_STRING = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_STRING = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
