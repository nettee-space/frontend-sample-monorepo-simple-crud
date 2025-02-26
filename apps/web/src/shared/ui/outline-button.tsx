import { Button } from '@workspace/ui/components/button';
export function OutLineButton({
  text,
  action,
}: {
  text: string;
  action: () => void;
}) {
  return (
    <Button variant={'outline'} onClick={action}>
      {text}
    </Button>
  );
}
