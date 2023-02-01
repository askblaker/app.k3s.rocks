import AddButton from "../components/AddButton";
import { Server } from "../components/Server";
import { ServerModal } from "../components/ServerModal";
import { servers } from "../lib/store";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Page() {
  const [myservers, setServers] = useAtom(servers);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [serverToEdit, setServerToEdit] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("servers");
    if (item !== null) {
      setServers(JSON.parse(item));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // This should only run once

  function addButton() {
    setOpen(true);
  }

  function deleteServer(id) {
    const newlist = myservers.filter((obj) => {
      return obj.id !== id;
    });

    setServers(newlist);
  }

  function editServer(id) {
    const ser = getServerFromId(id);
    setServerToEdit(ser);
    setEditOpen(true);
  }

  function getServerFromId(id) {
    const server = myservers.filter((obj) => {
      return obj.id === id;
    })[0];
    return server;
  }

  return (
    <>
      <Head>
        <title>Servers | app.k3s.rocks</title>
      </Head>
      <h1>Servers</h1>
      <ServerModal setModalOpen={setOpen} modalState={open} />
      {serverToEdit && (
        <ServerModal
          title="Edit Server"
          id={serverToEdit.id}
          setModalOpen={setEditOpen}
          modalState={editOpen}
        />
      )}
      <AddButton onClick={() => addButton()} />

      {myservers.map((item) => (
        <Server
          key={item.id}
          name={item.name}
          ip={item.ip}
          id={item.id}
          deleteCallback={(id) => deleteServer(id)}
          editCallback={(id) => editServer(id)}
        />
      ))}
    </>
  );
}
