import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Données fictives pour la démonstration
const RECENT_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient', joinedDate: '2 heures' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Patient', joinedDate: '5 heures' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Patient', joinedDate: '1 jour' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Patient', joinedDate: '2 jours' },
];

export function RecentUsers() {
  return (
    <div className="space-y-4">
      {RECENT_USERS.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Il y a {user.joinedDate}
          </div>
        </div>
      ))}
    </div>
  );
}