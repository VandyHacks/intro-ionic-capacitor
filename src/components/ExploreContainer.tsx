import { IonButton, IonDatetime, IonIcon, IonInput, IonText } from '@ionic/react';
import './ExploreContainer.css';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useEffect, useState } from 'react';
import { trashOutline } from 'ionicons/icons';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  const refreshNotifications = async () => {
    setNotifications((await LocalNotifications.getPending()).notifications);
  }

  const scheduleNotifications = async () => {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [{
        id: Math.round(Math.random() * 1_000_000),
        title: "Daily Notification!",
        body: name,
        schedule: {
          on: {
            hour: Number(time.split(":")[0]),
            minute: Number(time.split(":")[1])
          }
        },
      }]
    });
    setName("");
    refreshNotifications();
  }

  useEffect(() => {
    refreshNotifications();
  }, []);

  return (
    <div id="container" style={{"maxWidth": "600px", "margin": "0 auto"}}>
      <center>
        <IonDatetime mode="ios" presentation="time" style={{"borderRadius": "8px"}} onIonChange={e => {
          if (e.detail.value) {
            const val = e.detail.value as string;
            setTime(val.split("T")[1]);
          }
        }} />
        <IonInput type="text" placeholder="Reminder Name" value={name} onIonInput={e => setName(e.detail.value ?? "")} />
      </center>
      <br />
      <IonButton onClick={scheduleNotifications}>Create</IonButton>
      <br />
      { notifications.map(n => {
        return (
          <div key={n.id}>
            <IonText>
              <h5>{n.body}</h5>
              <IonIcon style={{"fontSize": "25px"}} icon={trashOutline} onClick={async () => {
                await LocalNotifications.cancel({notifications: [{ id: n.id }]});
                refreshNotifications();
              }} />
            </IonText>            
          </div>
        );
      }) }
    </div>
  );
};

export default ExploreContainer;
