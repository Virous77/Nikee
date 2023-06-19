import styles from "./share.module.scss";
import { socialShare } from "../../utils/data";
import { useGlobalContext } from "../../store/GlobalContext";
import React from "react";

type ShareType = {
  name: string;
};

const Share: React.FC<ShareType> = ({ name }) => {
  const { handleSetNotification } = useGlobalContext();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    handleSetNotification({
      message: "Link copy to clipboard",
      status: "success",
    });
  };

  const handleClick = (title: string) => {
    if (title === "link") {
      handleCopyLink();
    }

    if (title === "twitter") {
      window.open(
        "https://twitter.com/share?url=" +
          encodeURIComponent(window.location.href) +
          "&text=" +
          name,
        "",
        "menubar=no, toolbar=no,resizable=yes,scrollbar=yes,height=400,width=600"
      );
    }

    if (title === "facebook") {
      const navUrl =
        "https://www.facebook.com/sharer/sharer.php?u=" +
        `${window.location.href}`;
      window.open(navUrl, "_blank");
    }

    if (title === "mail") {
      const url =
        "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your+Subject+here&body=" +
        `${window.location.href}` +
        "&ui=2&tf=1&pli=1";

      window.open(url, "sharer", "toolbar=0,status=0,width=648,height=395");
    }
  };

  return (
    <div className={styles.share}>
      {socialShare.map((social) => (
        <li
          style={{ color: social.color }}
          key={social.id}
          onClick={() => handleClick(social.title)}
        >
          {social.title !== "whatsapp" && <social.name />}

          {social.title === "whatsapp" && (
            <a
              className="shareListItem"
              href={`https://api.whatsapp.com/send?text=${window.location.href}`}
              data-action="share/whatsapp/share"
              target={"_blank"}
              style={{ color: social.color }}
            >
              {<social.name />}
            </a>
          )}
        </li>
      ))}
    </div>
  );
};

export default Share;
