import { Badge } from './ui/badge';

interface StatusBadgeProps {
  status?: 'Complete' | 'Pending' | 'In Progress' | 'Invited';
  mode?: 'Invite' | 'Manual';
}

export function StatusBadge({ status, mode }: StatusBadgeProps) {
  if (mode) {
    return (
      <Badge variant="outline">
        {mode} Mode
      </Badge>
    );
  }

  if (status === 'Complete') {
    return <Badge variant="outline">Complete</Badge>;
  }

  if (status === 'Pending') {
    return <Badge variant="outline">Pending</Badge>;
  }

  if (status === 'In Progress') {
    return <Badge variant="outline">In Progress</Badge>;
  }

  if (status === 'Invited') {
    return <Badge variant="outline">Invited</Badge>;
  }

  return null;
}
