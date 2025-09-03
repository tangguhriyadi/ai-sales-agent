"use client";

import { useEffect } from "react";
import { createChat } from "@n8n/chat";

export const Chatn8n = () => {
    useEffect(() => {
        createChat({
            webhookUrl:
                "https://n8n.inventrackbetest.site/webhook/91833f24-c0b7-4ebc-813d-46e90ea4fdfc/chat",
            initialMessages: [
                "Hai ! Saya Farah 👋, Ada yang bisa saya bantu hari ini di Tangguh Pharmacy? Apakah Anda sedang mencari produk kesehatan atau obat tertentu? 😊",
            ],
            mode: "fullscreen",
            chatInputKey: "chatInput",
            target: "#n8n-chat",
            // Theme customization options if supported
            theme: {
                primaryColor: "hsl(25, 50%, 65%)",
                backgroundColor: "transparent",
                textColor: "hsl(25, 20%, 20%)",
            },
            i18n: {
                en: {
                    title: "Sales Agent Chat",
                    placeholder: "Type your message here...",
                    sendButton: "Send",
                    closeButton: "Close",
                    welcomeMessage:
                        "Hai ! Saya Farah, Sales Agent dari Tangguh Pharmacy",
                    footer: "",
                    closeButtonTooltip: "",
                    getStarted: "",
                    inputPlaceholder: "Ketik pesan Anda di sini...",
                    subtitle: "",
                },
            },
            // Additional styling options
        });
    }, []);

    return <div></div>;
};
