"use client";
import React, { useState, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import "./index.css";
import { useUser } from "@/app/context/user";
import { editUser } from "@/utils/editUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Language, lessFortunate } from "@prisma/client";

const EditProfilePage = () => {
  const { user } = useUser();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newDisability, setNewDisability] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLastName(e.target.value);
  };

  const handleDisabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewDisability(e.target.value);
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewLanguage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Brak danych użytkownika.");
      return;
    }

    const updatedFirstName = newFirstName || user?.first_name || "";
    const updatedLastName = newLastName || user?.last_name || "";
    const updatedDisability =
      newDisability === "null" ? null : (newDisability as lessFortunate);
    const updatedLanguage =
      newLanguage === "pl"
        ? Language.Polski
        : newLanguage === "es"
        ? Language.Espanol
        : user.language;
    const success = await editUser(
      user?.id,
      updatedFirstName,
      updatedLastName,
      updatedDisability,
      updatedLanguage
    );

    if (success) {
      toast.success("Dane zostały zaktualizowane.", { autoClose: 3000 });
    } else {
      toast.error("Wystąpił błąd podczas aktualizacji danych.", {
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="edit">
          <h2>Edytuj swoje dane</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Zmień imie</p>
              <input
                type="text"
                value={newFirstName}
                onChange={handleFirstNameChange}
                placeholder={`${user?.first_name}`}
              />
            </label>
            <label>
              <p>Zmień nazwisko</p>
              <input
                type="text"
                value={newLastName}
                onChange={handleLastNameChange}
                placeholder={`${user?.last_name}`}
              />
            </label>
            <label>
              <p>Zmień język</p>
              <div>
                <input
                  type="radio"
                  name="language"
                  value="pl"
                  onChange={handleLanguageChange}
                />
                {" Polski"}
              </div>
              <div>
                <input
                  type="radio"
                  name="language"
                  value="es"
                  onChange={handleLanguageChange}
                />
                {" Hiszpański"}
              </div>
            </label>
            <label>
              <p>Wybierz</p>
              <div className="custom-select">
                <select onChange={handleDisabilityChange} value={newDisability}>
                  <option value="null"> brak </option>
                  {Object.values(lessFortunate).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <button type="submit" className="submitButton">
              Zapisz zmiany
              <ToastContainer />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
