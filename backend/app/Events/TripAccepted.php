<?php

namespace App\Events;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TripAccepted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public Trip $trip;
    private User $user;

    /**
     * Create a new event instance.
     */
    public function __construct(Trip $trip,User $user)
    {
        $this->trip = $trip;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */

    // TODO consider to do it new PrivateChannel('channel-name')
    public function broadcastOn(): array
    {
        return [
            new Channel('passenger_' . $this->user->id),
        ];
    }
}
