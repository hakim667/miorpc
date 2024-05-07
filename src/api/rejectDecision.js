import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const rejectDecision = async (decision) => {
  let temp = { ...decision };
  delete temp.id;
  if (decision.score) {
    if (decision.score === -1) {
      return await setDoc(doc(db, "decisions", decision.id), {
        ...temp,
        etat: "Rejected",
      })
        .then(() => {
          return {
            status: true,
            message: "Décision refusée",
          };
        })
        .catch((error) => {
          return {
            status: false,
            error: error,
          };
        });
    } else {
      temp.score -= 1;
      return await setDoc(doc(db, "decisions", decision.id), {
        ...temp,
      })
        .then(() => {
          return {
            status: true,
            message: "Décision refusée, en attente d'un autre signataire",
          };
        })
        .catch((error) => {
          return {
            status: false,
            error: error,
          };
        });
    }
  } else {
    temp.score = -1;
    return await setDoc(doc(db, "decisions", decision.id), {
      ...temp,
    })
      .then(() => {
        return {
          status: true,
          message: "Décision refusée, en attente d'un autre signataire",
        };
      })
      .catch((error) => {
        return {
          status: false,
          error: error,
        };
      });
  }
};

export default rejectDecision;
