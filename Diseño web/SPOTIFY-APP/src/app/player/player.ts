import { Component, OnInit } from '@angular/core';
import { Song } from '../interfaces/song';
import { SpotifyPlaylistService } from '../services/spotify-api/spotify-playlist-service';
import { SpotifyLoginService } from '../services/spotify-api/spotify-login-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit {

  song: Song | null = null;  // null hasta que los datos estén listos
  playlist: Song[] = [];
  isLoading: boolean = true; // Bandera para controlar el estado de carga
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private spotifyPlaylistService: SpotifyPlaylistService,
    private spotifyLoginService: SpotifyLoginService
  ){
    console.log("COMPONENTE APP CREADO");
  }

  ngOnInit(): void {
    this.loadPlaylist();
  }

  async loadPlaylist(): Promise<void> {
    try {
      // Mantener el estado de carga mientras se obtienen los datos
      this.isLoading = true;
      this.hasError = false;
      console.log('Iniciando carga de playlist...');
      
      // PASO 1: Esperar a obtener el token de Spotify
      console.log('Solicitando token de autenticación...');
      const tokenResponse = await firstValueFrom(this.spotifyLoginService.getToken());
      const token = tokenResponse.access_token;
      console.log('✓ Token obtenido:', token);
      
      // PASO 2: Esperar a obtener la playlist completa
      console.log('Solicitando datos de la playlist...');
      const playlistResponse = await firstValueFrom(this.spotifyPlaylistService.getPlaylist(token));
      console.log('✓ Playlist recibida:', playlistResponse);
      console.log('✓ Tracks:', playlistResponse.tracks);
      
      // PASO 3: Procesar TODOS los tracks y crear la lista completa
      console.log('Procesando canciones...');
      const tempPlaylist: Song[] = [];
      
      if (playlistResponse.tracks && playlistResponse.tracks.items) {
        playlistResponse.tracks.items.forEach((item: any, index: number) => {
          if (item.track) {
            const track = item.track;
            
            // Obtener la URL de la imagen del álbum
            let coverUrl = "https://picsum.photos/200";
            if (track.album && track.album.images && track.album.images.length > 0) {
              coverUrl = track.album.images[0].url;
            }
            
            const song: Song = {
              cover: coverUrl,
              name: track.name || 'Sin título',
              artist: track.artists?.map((artist: any) => artist.name).join(', ') || 'Artista desconocido'
            };
            
            tempPlaylist.push(song);
            console.log(`✓ Canción ${index + 1} procesada: ${song.name} - ${song.artist}`);
          }
        });
      }
      
      console.log(`✓ Total de canciones procesadas: ${tempPlaylist.length}`);
      
      // PASO 4: Solo cuando TODO esté listo, asignar los datos
      console.log('Todos los datos están listos. Actualizando la vista...');
      this.playlist = tempPlaylist;
      
      // Establecer la primera canción como canción actual
      if (this.playlist.length > 0) {
        this.song = this.playlist[0];
        console.log('✓ Canción actual establecida:', this.song);
      }
      
      // PASO 5: Marcar como completada la carga
      this.isLoading = false;
      console.log('✅ Carga completada. Vista lista para renderizar.');
      
    } catch (error) {
      console.error('❌ Error durante la carga:', error);
      this.hasError = true;
      this.errorMessage = 'No se pudo cargar la playlist de Spotify';
      this.isLoading = false;
      
      // Datos de ejemplo en caso de error
      this.playlist = [
        {
          cover: "https://picsum.photos/201",
          name: "Error al cargar",
          artist: "Verifica tu conexión"
        }
      ];
      this.song = this.playlist[0];
    }
  }


}
