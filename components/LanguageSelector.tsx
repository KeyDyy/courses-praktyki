import { useState } from "react";

interface LanguageSelectorProps {
    onSelectLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        onSelectLanguage(language);
    };

    return (
        <div>
            <label className="block mb-1">Select Language:</label>
            <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
            >
                <option value="en">English</option>
                <option value="es">Español</option>

            </select>
        </div>
    );
};

export default LanguageSelector;
