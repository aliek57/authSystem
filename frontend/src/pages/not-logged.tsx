import { useTranslation } from "react-i18next";

export function NotLogged() {
    const { t } = useTranslation('not-logged');
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
        </div>
    );
}