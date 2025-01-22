/**
 * Maps a given language to its corresponding country emoji.
 * @param language - The language to map.
 * @returns The corresponding country emoji or an empty string if not found.
 */
export const getCountryEmoji = (language: string) => {
  const sanitizeLanguage = (lang: string) => {
    return lang
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const languageToEmoji: { [key: string]: string } = {
    English: "🇬🇧",
    Spanish: "🇪🇸",
    French: "🇫🇷",
    German: "🇩🇪",
    Chinese: "🇨🇳",
    Japanese: "🇯🇵",
    Arabic: "🇸🇦",
    Portuguese: "🇵🇹",
    Russian: "🇷🇺",
    Italian: "🇮🇹",
    Dutch: "🇳🇱",
    Korean: "🇰🇷",
    Hindi: "🇮🇳",
    Bengali: "🇧🇩",
    Turkish: "🇹🇷",
    Vietnamese: "🇻🇳",
    Polish: "🇵🇱",
    Ukrainian: "🇺🇦",
    Romanian: "🇷🇴",
    Greek: "🇬🇷",
    Hungarian: "🇭🇺",
    Czech: "🇨🇿",
    Swedish: "🇸🇪",
    Danish: "🇩🇰",
    Finnish: "🇫🇮",
    Norwegian: "🇳🇴",
    Slovak: "🇸🇰",
    Lithuanian: "🇱🇹",
    Slovenian: "🇸🇮",
    Latvian: "🇱🇻",
    Estonian: "🇪🇪",
    Croatian: "🇭🇷",
    Serbian: "🇷🇸",
    Bosnian: "🇧🇦",
    Albanian: "🇦🇱",
    Macedonian: "🇲🇰",
    Montenegrin: "🇲🇪",
    Bulgarian: "🇧🇬",
    Belarusian: "🇧🇾",
    Moldovan: "🇲🇩",
    Maltese: "🇲🇹",
    Icelandic: "🇮🇸",
    Faroese: "🇫🇴",
    Greenlandic: "🇬🇱",
    Armenian: "🇦🇲",
    Georgian: "🇬🇪",
    Azerbaijani: "🇦🇿",
    Kazakh: "🇰🇿",
    Uzbek: "🇺🇿",
    Turkmen: "🇹🇲",
    Kyrgyz: "🇰🇬",
    Tajik: "🇹🇯",
    Mongolian: "🇲🇳",
    Nepali: "🇳🇵",
    Sinhalese: "🇱🇰",
    Tamil: "🇱🇰",
    Urdu: "🇵🇰",
    Pashto: "🇦🇫",
    Persian: "🇮🇷",
    Kurdish: "🇮🇶",
    Hebrew: "🇮🇱",
    Yiddish: "🇮🇱",
    Indian: "🇮🇳",
    Indonesian: "🇮🇩",
    Filipino: "🇵🇭",
    Malaysian: "🇲🇾",
    Thai: "🇹🇭",
    Burmese: "🇲🇲",
    Khmer: "🇰🇭",
    Lao: "🇱🇦",
  };

  const sanitizedLanguage = sanitizeLanguage(language);
  return languageToEmoji[sanitizedLanguage] || "";
};
