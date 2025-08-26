exports.generateCredentialsEmail = ({ email, password, role, lang = "en" }) => {
  const isFr = lang === "fr";

  return {
    subject: isFr ? "Vos identifiants de connexion" : "Your login credentials",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${isFr ? "Bienvenue 👋" : "Welcome 👋"}</h2>
        <p>${
          isFr
            ? "Votre compte a été créé ou mis à jour avec succès."
            : "Your account has been created or updated successfully."
        }</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>${
          isFr ? "Mot de passe" : "Password"
        }:</strong> ${password}</p>
        <p><strong>${isFr ? "Rôle" : "Role"}:</strong> ${role}</p>
        <p>${
          isFr
            ? "Merci de vous connecter et de changer votre mot de passe dès que possible."
            : "Please log in and change your password as soon as possible."
        }
        </p>
      </div>
    `,
  };
};
